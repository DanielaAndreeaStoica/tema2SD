package ro.tuc.ds2020.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.tuc.ds2020.dtos.UserDTO;
import ro.tuc.ds2020.services.UserService;

@RestController
@CrossOrigin
@RequestMapping(value = "/login")
public class LoginController {

    private final UserService userService;

    @Autowired
    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public ResponseEntity<UserDTO> login(@RequestParam(required = false) String username, @RequestParam(required = false) String password){
        UserDTO userDTO = userService.login(username, password);
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }
}
