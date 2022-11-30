package ro.tuc.ds2020.dtos.builders;

import ro.tuc.ds2020.dtos.DeviceDTO;
import ro.tuc.ds2020.dtos.UserDTO;
import ro.tuc.ds2020.entities.Device;
import ro.tuc.ds2020.entities.User;

public class DeviceBuilder {

    public DeviceBuilder(){}

    public static DeviceDTO toDeviceDTO(Device device) {
        return new DeviceDTO(device.getId(), device.getDescription(), device.getAddress(),device.getMaxHourlyEnergyConsumption(), device.getUser().getId(), device.getDeviceHourlyConsumptionList());
    }

    public static Device toEntity(DeviceDTO deviceDTO) {
        return new Device(deviceDTO.getDescription(),
                deviceDTO.getAddress(),
                deviceDTO.getMaxHourlyEnergyConsumption(),
                deviceDTO.getDeviceHourlyConsumptionList());
    }
}
