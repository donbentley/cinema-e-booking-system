package com.csci4050.user.controllers;

import com.csci4050.user.entities.Role;
import com.csci4050.user.entities.User;
import com.csci4050.user.entities.Customer.UserStatus;
import com.csci4050.user.entities.Customer;
import com.csci4050.user.requests.LoginRequest;
import com.csci4050.user.requests.SignupRequest;
import com.csci4050.user.security.JWTUtil;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import com.csci4050.user.repositories.CustomerRepository;
import com.csci4050.user.repositories.RoleRepository;
import com.csci4050.user.repositories.UserRepository;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.io.UnsupportedEncodingException;
import java.util.Collections;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired 
    private JWTUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest){
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginRequest.getUsernameOrEmail(), loginRequest.getPassword()));
                SecurityContextHolder.getContext().setAuthentication(authentication);
                String token = jwtUtil.generateToken(loginRequest.getUsernameOrEmail());
                return new ResponseEntity<>(token, HttpStatus.OK);
        } catch (AuthenticationException authExc){
            throw new RuntimeException("Invalid Login Credentials");
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signupRequest) throws UnsupportedEncodingException, MessagingException {

        // add check for username exists in a DB
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            return new ResponseEntity<>("Username is already taken", HttpStatus.BAD_REQUEST);
        }
    
        // add check for email exists in DB
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return new ResponseEntity<>("Email is already taken", HttpStatus.BAD_REQUEST);
        }
    
        // create user object
        User user = new User();
        user.setUsername(signupRequest.getUsername());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        Role roles = roleRepository.findByName("ROLE_CUSTOMER").get();
        user.setRoles(Collections.singleton(roles));
        User newUser = userRepository.save(user);

        // create customer object
        Customer customer = new Customer();

        customer.setUser(newUser);
        customer.setFirst(signupRequest.getFirst());
        customer.setLast(signupRequest.getLast());
        customer.setStatus(UserStatus.INACTIVE);
        customer.setVerificationCode(RandomStringUtils.randomAlphanumeric(64));
        customerRepository.save(customer);
        sendVerificationEmail(customer, "http://localhost:8080");
        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
    }

    private void sendVerificationEmail(Customer customer, String siteURL)
        throws MessagingException, UnsupportedEncodingException {
        
        String toAddress = customer.getUser().getEmail();
        String fromAddress = "cinema.ebooking.b11@gmail.com";
        String senderName = "Cinema E-Booking B-11";
        String subject = "Please verify your registration";
        String content = "Dear [[name]],<br>"
            + "Please click the link below to verify your registration:<br>"
            + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
            + "Thank you,<br>"
            + "Cinema E-Booking B11.";
     
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
     
        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);
     
        content = content.replace("[[name]]", customer.getFirst() + " " + customer.getLast());
        String verifyURL = siteURL + "/auth/verify/" + customer.getVerificationCode();
     
        content = content.replace("[[URL]]", verifyURL);
     
        helper.setText(content, true);
     
        mailSender.send(message);
    }

    @GetMapping("/verify/{code}")
    public ResponseEntity<?> verify(@PathVariable String code) {
        Customer customer = customerRepository.findByVerificationCode(code);

        if (customer == null) {
            return new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
        }

        if (customer.getStatus() == UserStatus.ACTIVE) {
            return new ResponseEntity<>("Email already verified", HttpStatus.BAD_REQUEST);
        }

        customer.setVerificationCode(null);
        customer.setStatus(UserStatus.ACTIVE);
        customerRepository.save(customer);
        return new ResponseEntity<>("Verification successful", HttpStatus.OK);
    }
}