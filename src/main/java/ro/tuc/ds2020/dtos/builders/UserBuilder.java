package ro.tuc.ds2020.dtos.builders;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import ro.tuc.ds2020.dtos.UserDTO;
import ro.tuc.ds2020.entities.Device;
import ro.tuc.ds2020.entities.User;

import java.util.ArrayList;
import java.util.List;

public class UserBuilder {

    public UserBuilder(){}

    public static UserDTO toUserDTO(User user) {
        return new UserDTO(user.getId(), user.getName(), user.getRole(), user.getUsername(), user.getPassword(), user.getDeviceList());
    }

    public static User toEntity(UserDTO userDTO) {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        userDTO.setPassword(bCryptPasswordEncoder.encode(userDTO.getPassword()));
        return new User(userDTO.getName(),
                userDTO.getRole(),
                userDTO.getUsername(),
                userDTO.getPassword(),
                new ArrayList<Device>());
    }
}
