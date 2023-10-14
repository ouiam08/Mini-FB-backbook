package fstg.irisi.miniFb.api.ressources;

import fstg.irisi.miniFb.api.common.ResourcePath;
import fstg.irisi.miniFb.domain.command.UserCommand;
import fstg.irisi.miniFb.domain.model.FBUser;
import fstg.irisi.miniFb.domain.repositories.FbUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Base64;
import java.util.Optional;


@RestController
@RequestMapping(ResourcePath.AUTH)
public class AuthResources {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private FbUserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signin")
    public ResponseEntity<String> authenticateUser(@RequestBody UserCommand loginDto) {

        Optional<FBUser> userOptional = userRepository.findByUserName(loginDto.getName());

        if (userOptional.isEmpty()) {
            return new ResponseEntity<>("User not found!", HttpStatus.BAD_REQUEST);
        }

        FBUser user = userOptional.get();

        if (!passwordEncoder.matches(loginDto.getPassword(), user.getUserPassword())) {
            return new ResponseEntity<>("Invalid password!", HttpStatus.BAD_REQUEST);
        }

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getName(), loginDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        return new ResponseEntity<>(String.valueOf(user.getUserId()), HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody UserCommand signUpDto) {
        if (userRepository.existsByUserName(signUpDto.getName())) {
            return new ResponseEntity<>("Username is already taken!", HttpStatus.BAD_REQUEST);
        }

        FBUser user = new FBUser();
        user.setUserName(signUpDto.getName());
        user.setUserPassword(passwordEncoder.encode(signUpDto.getPassword()));
        user.setUserPhoto(signUpDto.getPhoto());

        userRepository.save(user);

        return new ResponseEntity<>(user.getUserId(), HttpStatus.OK);

    }
}