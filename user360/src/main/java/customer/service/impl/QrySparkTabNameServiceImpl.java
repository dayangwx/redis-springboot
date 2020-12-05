 package customer.service.impl;

 import com.alibaba.fastjson.JSONObject;
 import customer.dao.QrySparkTabNameDao;
 import customer.service.QrySparkTabNameService;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.stereotype.Service;

 @Service("qrySparkTabNameService")
 public class QrySparkTabNameServiceImpl
   implements QrySparkTabNameService {
   @Autowired
   private QrySparkTabNameDao qrySparkTabNameDao;
   
   public String qryUsrTabName() {
     String tableName = "";
     JSONObject jsonObj = this.qrySparkTabNameDao.qryUsrTabName();
     if (jsonObj != null) {
       tableName = jsonObj.getString("tableName") + jsonObj.getString("monNewDate");
     }
     return tableName;
   }
 }


