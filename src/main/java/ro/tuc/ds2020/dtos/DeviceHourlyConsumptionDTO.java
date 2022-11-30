package ro.tuc.ds2020.dtos;

import org.springframework.hateoas.RepresentationModel;

import java.sql.Timestamp;
import java.util.UUID;

public class DeviceHourlyConsumptionDTO extends RepresentationModel<DeviceHourlyConsumptionDTO> {

    private UUID id;

    private int year;

    private int month;

    private int day;

    private int hour;

    private Long hourlyConsumption;

    private UUID deviceID;

    public DeviceHourlyConsumptionDTO(){}

    public DeviceHourlyConsumptionDTO(UUID id, int year, int month, int day, int hour, Long hourlyConsumption, UUID deviceID) {
        this.id = id;
        this.year = year;
        this.month = month;
        this.day = day;
        this.hour = hour;
        this.hourlyConsumption = hourlyConsumption;
        this.deviceID = deviceID;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    public int getHour() {
        return hour;
    }

    public void setHour(int hour) {
        this.hour = hour;
    }

    public Long getHourlyConsumption() {
        return hourlyConsumption;
    }

    public void setHourlyConsumption(Long hourlyConsumption) {
        this.hourlyConsumption = hourlyConsumption;
    }

    public UUID getDeviceID() {
        return deviceID;
    }

    public void setDeviceID(UUID deviceID) {
        this.deviceID = deviceID;
    }
}
