package ro.tuc.ds2020.dtos;

import org.springframework.hateoas.RepresentationModel;
import ro.tuc.ds2020.entities.DeviceHourlyConsumption;

import java.util.List;
import java.util.UUID;

public class DeviceDTO extends RepresentationModel<DeviceDTO> {

    private UUID id;

    private String description;

    private String address;

    private int maxHourlyEnergyConsumption;

    private UUID userID;

    private List<DeviceHourlyConsumption> deviceHourlyConsumptionList;

    public DeviceDTO(){}

    public DeviceDTO(UUID id, String description, String address, int maxHourlyEnergyConsumption, UUID userID,  List<DeviceHourlyConsumption> deviceHourlyConsumptionList) {
        this.id = id;
        this.description = description;
        this.address = address;
        this.maxHourlyEnergyConsumption = maxHourlyEnergyConsumption;
        this.userID = userID;
        this.deviceHourlyConsumptionList = deviceHourlyConsumptionList;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getMaxHourlyEnergyConsumption() {
        return maxHourlyEnergyConsumption;
    }

    public UUID getUserID() {
        return userID;
    }

    public void setUserID(UUID userID) {
        this.userID = userID;
    }

    public void setMaxHourlyEnergyConsumption(int maxHourlyEnergyConsumption) {
        this.maxHourlyEnergyConsumption = maxHourlyEnergyConsumption;
    }

    public List<DeviceHourlyConsumption> getDeviceHourlyConsumptionList() {
        return deviceHourlyConsumptionList;
    }

    public void setDeviceHourlyConsumptionList(List<DeviceHourlyConsumption> deviceHourlyConsumptionList) {
        this.deviceHourlyConsumptionList = deviceHourlyConsumptionList;
    }
}
