package ro.tuc.ds2020.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.tuc.ds2020.dtos.DeviceDTO;
import ro.tuc.ds2020.dtos.UserDTO;
import ro.tuc.ds2020.entities.Device;
import ro.tuc.ds2020.entities.RoleType;
import ro.tuc.ds2020.services.UserService;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@CrossOrigin
@RequestMapping(value = "/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public ResponseEntity<List<UserDTO>> getUsers() {
        List<UserDTO> dtos = userService.findUsers();
        for (UserDTO dto : dtos) {
            Link userLink = linkTo(methodOn(UserController.class)
                    .getUser(dto.getId())).withRel("userDetails");
            dto.add(userLink);
        }
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<UUID> insertUser(@Valid @RequestBody UserDTO userDTO) {
        UUID userID = userService.insert(userDTO);
        return new ResponseEntity<>(userID, HttpStatus.CREATED);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable("id") UUID userId) {
        UserDTO dto = userService.findUserById(userId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping(value = "/device/{id}")
    public ResponseEntity<List<DeviceDTO>> getDeviceListByUserId(@PathVariable("id") UUID userId) {
        List<DeviceDTO> deviceList = userService.findDeviceListByUserId(userId);
        return new ResponseEntity<>(deviceList, HttpStatus.OK);
    }

    @GetMapping(value = "/all{role}")
    public ResponseEntity<List<UserDTO>> getUserByRole(@PathVariable("role") RoleType userRole){
        List<UserDTO> dtos = userService.findUserByRole(userRole);

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<UUID> deleteUser(@PathVariable("id") UUID userId) throws Exception{
        UUID userID = userService.delete(userId);
        return new ResponseEntity<>(userID, HttpStatus.OK);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<UUID> updateUser(@PathVariable("id") UUID userId, @RequestBody UserDTO userRequest) throws Exception{
        UserDTO userDTO = userService.findUserById(userId);

        userService.update(userId,
                userRequest.getName(),
                userDTO.getRole(),
                userRequest.getUsername(),
                userRequest.getPassword());

        return new ResponseEntity<>(userId, HttpStatus.OK);
    }

}
