package ro.tuc.ds2020.dtos;

import org.springframework.hateoas.RepresentationModel;
import ro.tuc.ds2020.entities.Device;
import ro.tuc.ds2020.entities.RoleType;

import java.util.List;
import java.util.UUID;

public class UserDTO extends RepresentationModel<UserDTO> {

    private UUID id;

    private String name;

    private RoleType role;

    private String username;

    private String password;

    private List<Device> deviceList;

    public UserDTO(){}

    public UserDTO(UUID id, String name, RoleType role, String username, String password, List<Device> deviceList) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.username = username;
        this.password = password;
        this.deviceList = deviceList;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public RoleType getRole() {
        return role;
    }

    public void setRole(RoleType role) {
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Device> getDeviceList() {
        return deviceList;
    }

    public void setDeviceList(List<Device> deviceList) {
        this.deviceList = deviceList;
    }
}
