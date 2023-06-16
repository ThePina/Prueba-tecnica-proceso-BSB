package com.thepina.webAPI.Controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;





@RestController
@RequestMapping("/api/indices")
public class IndicesController {

    @GetMapping
    public ResponseEntity<String> getAllIndices() throws IOException {
        /* 
       // Cargar la configuración desde el archivo properties
        Properties properties = new Properties();
        InputStream inputStream = getClass().getClassLoader().getResourceAsStream("application.properties");
        properties.load(inputStream);
        inputStream.close();
        
        // Obtener el valor del token
        String token = properties.getProperty("access_token");
        

        //consulta a la API 

        String url = "https://startup.bolsadesantiago.com/api/consulta/TickerOnDemand/getIndices?access_token={access_token}";

            // Reemplazar el placeholder {access_token} con el valor real del token
            url = url.replace("{access_token}", URLEncoder.encode(token, "UTF-8"));


             // Crear objeto URL
            URL apiUrl = new URL(url);
            // Abrir conexión
            HttpURLConnection connection = (HttpURLConnection) apiUrl.openConnection();

             // Configurar el método y los encabezados
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Accept", "application/json");

            // Configurar el cuerpo del mensaje
            connection.setDoOutput(true);
            String requestBody = "{}"; // Cuerpo en formato JSON
            connection.getOutputStream().write(requestBody.getBytes("UTF-8"));

            
             // Obtener la respuesta
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
            reader.close();

            // Imprimir la respuesta

            System.out.println(response.toString());

            // Cerrar la conexión
            connection.disconnect();
            
*/
            //respuesta
            String respuesta= "{\"listaResult\":[{\"Nombre\":\"SPCLXIGPA\",\"Valor\":29392.08,\"Mayor\":29408.02,\"Menor\":29225.11,\"Medio\":0,\"Variacion\":0.44},{\"Nombre\":\"SP IPSA\",\"Valor\":5742.2,\"Mayor\":5746.31,\"Menor\":5710.6,\"Medio\":0,\"Variacion\":0.45},{\"Nombre\":\"SPCLXIN10\",\"Valor\":7657.09,\"Mayor\":7660.75,\"Menor\":7584.3,\"Medio\":0,\"Variacion\":0.56}]} ";
 

                        

            return ResponseEntity.ok(respuesta);
   
     
            
           



        /*
        String jsonString = ;

        ObjectMapper objectMapper = new ObjectMapper();
        
        List<Indice> listaIndices = new ArrayList<>();
        
        //listaIndices=Arrays.asList(objectMapper.readValue(jsonString, Indice[].class));
        
       
         if (!listaIndices.isEmpty()) {
            return ResponseEntity.ok("listaIndices");
        } else {
            return ResponseEntity.noContent().build();
        } */
    }
}