 package customer.util;

 import org.slf4j.Logger;
 import org.slf4j.LoggerFactory;

 import java.io.BufferedInputStream;
 import java.io.IOException;
 import java.io.InputStream;
 import java.util.Properties;

 public final class Config
 {
   private static final Logger LOGGER = LoggerFactory.getLogger(customer.util.Config.class);
 
   
   private static Properties properties;
 
   
   static {
     try {
       properties = new Properties();
       String filePath = "config/usr360.properties";
       InputStream in = new BufferedInputStream(customer.util.Config.class.getClassLoader().getResourceAsStream(filePath));
       properties.load(in);
       in.close();
     }
     catch (IOException e) {
       LOGGER.error("读取配置信息出错！", e);
     } 
   }
   
   public static String getObject(String prepKey) {
     prepKey = prepKey.trim();
     if (properties.containsKey(prepKey)) {
       return properties.getProperty(prepKey).trim();
     }
     return "";
   }
 
   
   public static Integer getInt(String prepKey) {
     if (properties.containsKey(prepKey)) {
       return Integer.valueOf(properties.getProperty(prepKey));
     }
     return null;
   }
 }


