package com.csci4050.user.services;

import com.csci4050.user.entities.User;
import com.csci4050.user.entities.Customer.UserStatus;
import com.csci4050.user.entities.Customer;
import com.csci4050.user.entities.Role;
import com.csci4050.user.repositories.CustomerRepository;
import com.csci4050.user.repositories.RoleRepository;
import com.csci4050.user.repositories.UserRepository;
import com.csci4050.user.requests.SignupRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Set;
import java.util.Collections;
import java.util.stream.Collectors;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    private PasswordEncoder passwordEncoder;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
          User user = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail)
                 .orElseThrow(() ->
                         new UsernameNotFoundException("User not found with username or email: "+ usernameOrEmail));

        Set<GrantedAuthority> authorities = user
                .getRoles()
                .stream()
                .map((role) -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toSet());

        return new org.springframework.security.core.userdetails.User(user.getEmail(),
                user.getPassword(),
                authorities);
    }

    public String registerUser(SignupRequest signupRequest) {

        // add check for username exists in a DB
        if(userRepository.existsByUsername(signupRequest.getUsername())){
            return "Username is already taken!";
        }

        // add check for email exists in DB
        if(userRepository.existsByEmail(signupRequest.getEmail())){
            return "Email is already taken!";
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

        return ("User registered successfully");
    }
}