package com.csci4050.user.controllers;

import com.csci4050.customer.entities.Customer;
import com.csci4050.customer.entities.Customer.UserStatus;
import com.csci4050.customer.repositories.CustomerRepository;
import com.csci4050.user.entities.Role;
import com.csci4050.user.entities.User;
import com.csci4050.user.requests.LoginRequest;
import com.csci4050.user.requests.ResetPasswordRequest;
import com.csci4050.user.requests.SignupRequest;
import com.csci4050.user.responses.UserResponse;
import com.csci4050.user.security.JWTUtil;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.io.UnsupportedEncodingException;
import java.util.stream.Collectors;
import java.util.Collections;
import java.util.Optional;
import java.util.Set;

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
            UserResponse userResponse = new UserResponse();
            userResponse.setRoles(getUserRoles());
            userResponse.setToken(jwtUtil.generateToken(loginRequest.getUsernameOrEmail()));
            return new ResponseEntity<>(userResponse, HttpStatus.OK);
        } catch (AuthenticationException authExc){
            return new ResponseEntity<>(Collections.singletonMap("error", "Invalid Login Credentials"), HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signupRequest) throws UnsupportedEncodingException, MessagingException {

        // add check for username exists in a DB
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            return new ResponseEntity<>(Collections.singletonMap("error", "Username is already taken"), HttpStatus.BAD_REQUEST);
        }
    
        // add check for email exists in DB
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return new ResponseEntity<>(Collections.singletonMap("error", "Email is already taken"), HttpStatus.BAD_REQUEST);
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

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
            signupRequest.getEmail(), signupRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserResponse userResponse = new UserResponse();
        userResponse.setRoles(getUserRoles());
        userResponse.setToken(jwtUtil.generateToken(user.getEmail()));
        return new ResponseEntity<>(userResponse, HttpStatus.OK);

    }

    private Set<String> getUserRoles() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Set<String> roles = authentication.getAuthorities().stream()
            .map(r -> r.getAuthority()).collect(Collectors.toSet());
        return roles;
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

    @PutMapping("/verify/{code}")
    public ResponseEntity<?> verify(@PathVariable String code) {
        Optional<Customer> customer = customerRepository.findByVerificationCode(code);

        if (!customer.isPresent()) {
            return new ResponseEntity<>(Collections.singletonMap("error", "User not found"), HttpStatus.BAD_REQUEST);
        }
        Customer existingCustomer = customer.get();

        if (existingCustomer.getStatus() == UserStatus.ACTIVE) {
            return new ResponseEntity<>(Collections.singletonMap("error", "Email already verified"), HttpStatus.BAD_REQUEST);
        }

        existingCustomer.setVerificationCode(null);
        existingCustomer.setStatus(UserStatus.ACTIVE);
        customerRepository.save(existingCustomer);
        return new ResponseEntity<>("Verification successful", HttpStatus.OK);
    }

    @PutMapping("/forgot-password/{email}")
    public ResponseEntity<?> resetPasswordRequest (@PathVariable String email) throws UnsupportedEncodingException, MessagingException {
        Optional<User> user = userRepository.findByEmail(email);

        if (!user.isPresent()) {
            return new ResponseEntity<>(Collections.singletonMap("error", "User not found"), HttpStatus.BAD_REQUEST);
        }
        User existingUser = user.get();
        Optional<Customer> customer = customerRepository.findByUserId(existingUser.getId());
        if (!customer.isPresent()) {
            return new ResponseEntity<>(Collections.singletonMap("error", "User not found"), HttpStatus.BAD_REQUEST);
        }
        Customer existingCustomer = customer.get();
        existingCustomer.setVerificationCode(RandomStringUtils.randomAlphanumeric(64));
        customerRepository.save(existingCustomer);
        sendForgotPasswordEmail(existingCustomer, "http://localhost:8080");
        return new ResponseEntity<>("Email sent", HttpStatus.OK);
    }

    private void sendForgotPasswordEmail(Customer customer, String siteURL)
        throws MessagingException, UnsupportedEncodingException {
        
        String toAddress = customer.getUser().getEmail();
        String fromAddress = "cinema.ebooking.b11@gmail.com";
        String senderName = "Cinema E-Booking B-11";
        String subject = "Forgot your password?";
        String content = "Dear User,<br>"
            + "Please click the link below to reset your password:<br>"
            + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
            + "Thank you,<br>"
            + "Cinema E-Booking B11.";
     
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
     
        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);
     
        String verifyURL = siteURL + "/auth/resetPassword/" + customer.getVerificationCode();
     
        content = content.replace("[[URL]]", verifyURL);
     
        helper.setText(content, true);
     
        mailSender.send(message);
    }

    @PutMapping("/resetPassword/{code}")
    public ResponseEntity<?> resetPassword(@PathVariable String code, @RequestBody ResetPasswordRequest resetPasswordRequest) {
        Optional<Customer> customer = customerRepository.findByVerificationCode(code);

        if (!customer.isPresent()) {
            return new ResponseEntity<>(Collections.singletonMap("error", "User not found"), HttpStatus.BAD_REQUEST);
        }
        Customer existingCustomer = customer.get();
        existingCustomer.setVerificationCode(null);
        customerRepository.save(existingCustomer);
        User user = existingCustomer.getUser();
        user.setPassword(passwordEncoder.encode(resetPasswordRequest.getPassword()));
        return new ResponseEntity<>("Password successfully changed", HttpStatus.OK);
    }
}