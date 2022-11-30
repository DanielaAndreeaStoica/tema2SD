import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import org.json.JSONObject;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.sql.Timestamp;
import java.util.Scanner;
import java.util.UUID;

public class Send {

    private final static String QUEUE_NAME = "hello";

    public static void main(String[] argv) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("shark-01.rmq.cloudamqp.com");
        factory.setUsername("wxezwmdh");
        factory.setVirtualHost("wxezwmdh");
        factory.setPassword("Y78B-omYcvgk52eV4iNF3yfUA7lLiXHJ");
        try (Connection connection = factory.newConnection();

             Channel channel = connection.createChannel()) {

            File file=new File("sensor.csv");
            Scanner scanner = new Scanner(file);

            channel.queueDeclare(QUEUE_NAME, false, false, false, null);

            while(scanner.hasNextLine())
            {
                String measurement = scanner.nextLine();

                JSONObject jsonObject = new JSONObject();
                jsonObject.put("mesurement", measurement);

                String stringId = "5e493845-23c8-4fb9-b4ed-cb6f6eb4ac10";
                UUID id = UUID.fromString(stringId);
                jsonObject.put("device_id", id);

                Timestamp timestamp = new Timestamp(System.currentTimeMillis());
                jsonObject.put("timestamp", timestamp);

                channel.basicPublish("", QUEUE_NAME, null, jsonObject.toString().getBytes());

                System.out.println(" [x] Sent " + jsonObject.toString());

                Thread.sleep(1000);
            }

//            String message = "Hello World!";
//            channel.basicPublish("", QUEUE_NAME, null, message.getBytes(StandardCharsets.UTF_8));
//            System.out.println(" [x] Sent '" + message + "'");
        }
    }
}