package ro.tuc.ds2020.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.tuc.ds2020.controllers.handlers.exceptions.model.ResourceNotFoundException;
import ro.tuc.ds2020.dtos.DeviceDTO;
import ro.tuc.ds2020.dtos.builders.DeviceBuilder;
import ro.tuc.ds2020.entities.Device;
import ro.tuc.ds2020.repositories.DeviceRepository;
import ro.tuc.ds2020.repositories.UserRepository;


import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class DeviceService {

    private static final Logger LOGGER = LoggerFactory.getLogger(DeviceService.class);
    private final DeviceRepository deviceRepository;
    private final UserRepository userRepository;

    @Autowired
    public DeviceService(DeviceRepository deviceRepository, UserRepository userRepository) {
        this.deviceRepository = deviceRepository;
        this.userRepository = userRepository;
    }

    public List<DeviceDTO> findDevices() {
        List<Device> deviceList = deviceRepository.findAll();
        return deviceList.stream()
                .map(DeviceBuilder::toDeviceDTO)
                .collect(Collectors.toList());
    }

    public DeviceDTO findDeviceById(UUID id) {
        Optional<Device> deviceOptional = deviceRepository.findById(id);
        if (!deviceOptional.isPresent()) {
            LOGGER.error("Device with id {} was not found in db", id);
            throw new ResourceNotFoundException(Device.class.getSimpleName() + " with id: " + id);
        }
        return DeviceBuilder.toDeviceDTO(deviceOptional.get());
    }

    public UUID insert(DeviceDTO deviceDTO) {
        Device device = DeviceBuilder.toEntity(deviceDTO);
        device.setUser(userRepository.findById(deviceDTO.getUserID()).get());
        device = deviceRepository.save(device);
        LOGGER.debug("Device with id {} was inserted in db", device.getId());
        return device.getId();
    }

    public UUID delete(UUID deviceId) throws Exception{
        Optional<Device> deviceOptional = deviceRepository.findById(deviceId);
        if (!deviceOptional.isPresent()) {
            LOGGER.error("Device with id {} was not found in db", deviceId);
            throw new Exception(Device.class.getSimpleName() + " with id: " + deviceId);
        }
        deviceRepository.deleteById(deviceId);
        return deviceId;
    }

    @Transactional
    public void update(UUID deviceId, String description, String address, int maxHourlyEnergyConsumption){
        Device device = deviceRepository.findById(deviceId).orElseThrow(()-> new IllegalStateException("Device with id " + deviceId + " does not exist"));

        if(description != null && description.length() > 0 && !Objects.equals(device.getDescription(), description)) {
            device.setDescription(description);
        }

        if(address != null && address.length() > 0 && !Objects.equals(device.getAddress(), address)) {
            device.setAddress(address);
        }

        if(maxHourlyEnergyConsumption > 0 && !Objects.equals(device.getMaxHourlyEnergyConsumption(), maxHourlyEnergyConsumption)) {
            device.setMaxHourlyEnergyConsumption(maxHourlyEnergyConsumption);
        }
    }
}
