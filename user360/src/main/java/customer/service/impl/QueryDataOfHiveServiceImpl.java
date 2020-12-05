 package customer.service.impl;

 import customer.service.QueryDataOfHiveService;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.jdbc.core.JdbcTemplate;

 import java.util.Map;

 public class QueryDataOfHiveServiceImpl
   implements QueryDataOfHiveService
 {
   @Autowired
   private JdbcTemplate JdbcTemplate;
   
   public Map<String, Object> queryByNo(String no) {
     return null;
   }
 }


