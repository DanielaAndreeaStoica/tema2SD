package ro.tuc.ds2020.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.tuc.ds2020.controllers.handlers.exceptions.model.ResourceNotFoundException;
import ro.tuc.ds2020.dtos.DeviceDTO;
import ro.tuc.ds2020.dtos.DeviceHourlyConsumptionDTO;
import ro.tuc.ds2020.dtos.builders.DeviceBuilder;
import ro.tuc.ds2020.dtos.builders.DeviceHourlyConsumptionBuilder;
import ro.tuc.ds2020.entities.Device;
import ro.tuc.ds2020.entities.DeviceHourlyConsumption;
import ro.tuc.ds2020.entities.User;
import ro.tuc.ds2020.repositories.DeviceHourlyConsumptionRepository;
import ro.tuc.ds2020.repositories.DeviceRepository;

import javax.transaction.Transactional;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class DeviceHourlyConsumptionService {

    private static final Logger LOGGER = LoggerFactory.getLogger(DeviceService.class);
    private final DeviceHourlyConsumptionRepository deviceHourlyConsumptionRepository;
    private final DeviceRepository deviceRepository;

    @Autowired
    public DeviceHourlyConsumptionService(DeviceHourlyConsumptionRepository deviceHourlyConsumptionRepository, DeviceRepository deviceRepository) {
        this.deviceHourlyConsumptionRepository = deviceHourlyConsumptionRepository;
        this.deviceRepository = deviceRepository;
    }

    public List<DeviceHourlyConsumptionDTO> findDevicesHourlyConsumption() {
        List<DeviceHourlyConsumption> deviceHourlyConsumptionList = deviceHourlyConsumptionRepository.findAll();
        return deviceHourlyConsumptionList.stream()
                .map(DeviceHourlyConsumptionBuilder::toDeviceHourlyConsumptionDTO)
                .collect(Collectors.toList());
    }

    public DeviceHourlyConsumptionDTO findDeviceHourlyConsumptionById(UUID id) {
        Optional<DeviceHourlyConsumption> deviceHourlyConsumptionOptional = deviceHourlyConsumptionRepository.findById(id);
        if (!deviceHourlyConsumptionOptional.isPresent()) {
            LOGGER.error("Device hourly consumption with id {} was not found in db", id);
            throw new ResourceNotFoundException(DeviceHourlyConsumption.class.getSimpleName() + " with id: " + id);
        }
        return DeviceHourlyConsumptionBuilder.toDeviceHourlyConsumptionDTO(deviceHourlyConsumptionOptional.get());
    }

    @Transactional
    public UUID insert(DeviceHourlyConsumptionDTO deviceHourlyConsumptionDTO) {
        DeviceHourlyConsumption deviceHourlyConsumption = DeviceHourlyConsumptionBuilder.toEntity(deviceHourlyConsumptionDTO);
        Device device = deviceRepository.findById(deviceHourlyConsumptionDTO.getDeviceID()).get();
        deviceHourlyConsumption.setDevice(device);

        if(deviceHourlyConsumption.getHourlyConsumption() > device.getMaxHourlyEnergyConsumption()){
            device.setMaxHourlyEnergyConsumption(deviceHourlyConsumption.getHourlyConsumption().intValue());
        }
        deviceHourlyConsumption = deviceHourlyConsumptionRepository.save(deviceHourlyConsumption);

        LOGGER.debug("Device hourly consumption with id {} was inserted in db", deviceHourlyConsumption.getId());
        return deviceHourlyConsumption.getId();
    }

    public List<DeviceHourlyConsumptionDTO> findDeviceHourlyConsumptionListByDeviceId(UUID id){
        Optional<Device> deviceOptional = deviceRepository.findById(id);
        if (!deviceOptional.isPresent()) {
            LOGGER.error("Device with id {} was not found in db", id);
            throw new ResourceNotFoundException(Device.class.getSimpleName() + " with id: " + id);
        }

        List<DeviceHourlyConsumption> deviceHourlyConsumptionList = deviceOptional.get().getDeviceHourlyConsumptionList().stream().distinct().collect(Collectors.toList());
        return deviceHourlyConsumptionList.stream()
                .map(DeviceHourlyConsumptionBuilder::toDeviceHourlyConsumptionDTO)
                .collect(Collectors.toList());
    }
}
