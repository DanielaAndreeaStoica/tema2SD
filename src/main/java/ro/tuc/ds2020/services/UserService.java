package ro.tuc.ds2020.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ro.tuc.ds2020.controllers.handlers.exceptions.model.ResourceNotFoundException;
import ro.tuc.ds2020.dtos.DeviceDTO;
import ro.tuc.ds2020.dtos.UserDTO;
import ro.tuc.ds2020.dtos.builders.DeviceBuilder;
import ro.tuc.ds2020.dtos.builders.UserBuilder;
import ro.tuc.ds2020.entities.Device;
import ro.tuc.ds2020.entities.RoleType;
import ro.tuc.ds2020.entities.User;
import ro.tuc.ds2020.repositories.UserRepository;

import javax.transaction.Transactional;
import java.security.SecureRandom;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDTO> findUsers() {
        List<User> userList = userRepository.findAll();
        return userList.stream()
                .map(UserBuilder::toUserDTO)
                .collect(Collectors.toList());
    }

    public UserDTO findUserById(UUID id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (!userOptional.isPresent()) {
            LOGGER.error("User with id {} was not found in db", id);
            throw new ResourceNotFoundException(User.class.getSimpleName() + " with id: " + id);
        }
        return UserBuilder.toUserDTO(userOptional.get());
    }

    public List<UserDTO> findUserByRole(RoleType role) {
        List<User> userList = userRepository.findUserByRole(role);

        return userList.stream()
                .map(UserBuilder::toUserDTO)
                .collect(Collectors.toList());
    }

    public List<DeviceDTO> findDeviceListByUserId(UUID id){
        Optional<User> userOptional = userRepository.findById(id);
        if (!userOptional.isPresent()) {
            LOGGER.error("User with id {} was not found in db", id);
            throw new ResourceNotFoundException(User.class.getSimpleName() + " with id: " + id);
        }

        List<Device> devices = userOptional.get().getDeviceList().stream().distinct().collect(Collectors.toList());
        return devices.stream()
                .map(DeviceBuilder::toDeviceDTO)
                .collect(Collectors.toList());
    }

    public UUID insert(UserDTO userDTO) {
        User user = UserBuilder.toEntity(userDTO);
        user = userRepository.save(user);
        LOGGER.debug("User with id {} was inserted in db", user.getId());
        return user.getId();
    }

    public UUID delete(UUID userId) throws Exception{
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) {
            LOGGER.error("User with id {} was not found in db", userId);
            throw new Exception(User.class.getSimpleName() + " with id: " + userId);
        }
        userRepository.deleteById(userId);
        return userId;
    }

    @Transactional
    public void update(UUID userId, String name, RoleType roleType, String username, String password){
        User user = userRepository.findById(userId).orElseThrow(()-> new IllegalStateException("User with id " + userId + " does not exist"));

        if(name != null && name.length() > 0 && !Objects.equals(user.getName(), name)) {
            user.setName(name);
        }

        if(roleType != null && !Objects.equals(user.getRole(), roleType)){
            user.setRole(roleType);
        }

        if(username != null && username.length() > 0 && !Objects.equals(user.getUsername(), username)) {
            user.setUsername(username);
        }

        if(password != null && password.length() > 0 && !Objects.equals(user.getPassword(), password)) {
            user.setPassword(password);
        }
    }

    public UserDTO login(String username, String password){
        List<User> usersList = userRepository.findAll();

        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        Optional<User> user = usersList.stream().filter(x -> x.getUsername().equals(username)).findFirst();
        if(!user.isPresent()){
            return null;
        }
        String passwordAux = user.get().getPassword().replace("\n", "");

        if(bCryptPasswordEncoder.matches(password, passwordAux)){
            return UserBuilder.toUserDTO(user.get());
        }else{
            return null;
        }

    }
}
