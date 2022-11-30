package ro.tuc.ds2020.dtos.builders;

import ro.tuc.ds2020.dtos.DeviceDTO;
import ro.tuc.ds2020.dtos.DeviceHourlyConsumptionDTO;
import ro.tuc.ds2020.entities.Device;
import ro.tuc.ds2020.entities.DeviceHourlyConsumption;

import java.sql.Timestamp;
import java.time.LocalDateTime;

public class DeviceHourlyConsumptionBuilder {

    public DeviceHourlyConsumptionBuilder(){}

    public static DeviceHourlyConsumptionDTO toDeviceHourlyConsumptionDTO(DeviceHourlyConsumption deviceHourlyConsumption) {
        return new DeviceHourlyConsumptionDTO(deviceHourlyConsumption.getId(), deviceHourlyConsumption.getTimestamp().toLocalDateTime().getYear(),
                deviceHourlyConsumption.getTimestamp().toLocalDateTime().getMonthValue(),deviceHourlyConsumption.getTimestamp().toLocalDateTime().getDayOfMonth(),
                deviceHourlyConsumption.getTimestamp().toLocalDateTime().getHour(), deviceHourlyConsumption.getHourlyConsumption(),deviceHourlyConsumption.getDevice().getId());
    }

    public static DeviceHourlyConsumption toEntity(DeviceHourlyConsumptionDTO deviceHourlyConsumptionDTO) {
        return new DeviceHourlyConsumption(Timestamp.valueOf( LocalDateTime.of(deviceHourlyConsumptionDTO.getYear(),deviceHourlyConsumptionDTO.getMonth(),deviceHourlyConsumptionDTO.getDay(),deviceHourlyConsumptionDTO.getHour(),0)),
                deviceHourlyConsumptionDTO.getHourlyConsumption());
    }
}
