package ro.tuc.ds2020.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.tuc.ds2020.dtos.DeviceDTO;
import ro.tuc.ds2020.dtos.DeviceHourlyConsumptionDTO;
import ro.tuc.ds2020.entities.DeviceHourlyConsumption;
import ro.tuc.ds2020.services.DeviceHourlyConsumptionService;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@CrossOrigin
@RequestMapping(value = "/consumption")
public class DeviceHourlyConsumptionController {

    private final DeviceHourlyConsumptionService deviceHourlyConsumptionService;

    @Autowired
    public DeviceHourlyConsumptionController(DeviceHourlyConsumptionService deviceHourlyConsumptionService) {
        this.deviceHourlyConsumptionService = deviceHourlyConsumptionService;
    }

    @GetMapping()
    public ResponseEntity<List<DeviceHourlyConsumptionDTO>> getDevicesHourlyConsumption() {
        List<DeviceHourlyConsumptionDTO> dtos = deviceHourlyConsumptionService.findDevicesHourlyConsumption();
        for (DeviceHourlyConsumptionDTO dto : dtos) {
            Link deviceHourlyConsumptionLink = linkTo(methodOn(DeviceHourlyConsumptionController.class)
                    .getDeviceHourlyConsumption(dto.getId())).withRel("deviceHourlyConsumptionDetails");
            dto.add(deviceHourlyConsumptionLink);
        }
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<DeviceHourlyConsumptionDTO> getDeviceHourlyConsumption(@PathVariable("id") UUID deviceHourlyConsumptionId) {
        DeviceHourlyConsumptionDTO dto = deviceHourlyConsumptionService.findDeviceHourlyConsumptionById(deviceHourlyConsumptionId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<UUID> insertDeviceHourlyConsumption(@Valid @RequestBody DeviceHourlyConsumptionDTO deviceHourlyConsumptionDTO) {
        UUID deviceHourlyConsumptionID = deviceHourlyConsumptionService.insert(deviceHourlyConsumptionDTO);
        return new ResponseEntity<>(deviceHourlyConsumptionID, HttpStatus.CREATED);
    }

    @GetMapping(value = "/device/{id}")
    public ResponseEntity<List<DeviceHourlyConsumptionDTO>> getDeviceHourlyConsumptionListByDeviceId(@PathVariable("id") UUID deviceId) {
        List<DeviceHourlyConsumptionDTO> deviceHourlyConsumptionList = deviceHourlyConsumptionService.findDeviceHourlyConsumptionListByDeviceId(deviceId);
        return new ResponseEntity<>(deviceHourlyConsumptionList, HttpStatus.OK);
    }

}
