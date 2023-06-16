package com.thepina.webAPI.Controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import java.util.Properties;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;







@RestController
@RequestMapping("/api/indices")
public class IndicesController {

    @GetMapping
    public ResponseEntity<String> getAllIndices() throws IOException {

       // Cargar la configuración desde el archivo properties
        Properties properties = new Properties();
        InputStream inputStream = getClass().getClassLoader().getResourceAsStream("application.properties");
        properties.load(inputStream);
        inputStream.close();
        
        // Obtener el valor del token
        String token = properties.getProperty("access_token");
        

        //consulta a la API
        String url = "https://startup.bolsadesantiago.com/api/consulta/TickerOnDemand/getIndices?access_token={access_token}";
            url = url.replace("{access_token}", URLEncoder.encode(token, "UTF-8"));
            URL apiUrl = new URL(url);
            // Conectar a la API
            HttpURLConnection connection = (HttpURLConnection) apiUrl.openConnection();

             //Propiedades Conexion
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Accept", "application/json");

            
            connection.setDoOutput(true);
            String requestBody = "{}";
            connection.getOutputStream().write(requestBody.getBytes("UTF-8"));

            
             // Obtener la respuesta
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
            reader.close();

            // Cerrar conexion
            connection.disconnect();
 
            //mandar respuesta al navegador
            return ResponseEntity.ok(response.toString());
    }
}