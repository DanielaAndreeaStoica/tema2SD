package ro.tuc.ds2020.services;

import org.springframework.amqp.rabbit.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@EnableRabbit
public class SensorMessageConsumer {

    @Autowired
    public SensorMessageConsumer() {
    }

    @RabbitListener(queues = "${jsa.rabbitmq.genericqueue}")
    public void receiveMessage(final String message) throws IOException {

        System.out.println("Received message " + message);
    }
}