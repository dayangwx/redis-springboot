 package customer.service.impl;

 import com.alibaba.fastjson.JSONArray;
 import com.alibaba.fastjson.JSONObject;

 import customer.dao.CustomerListDao;
 import customer.service.CustomerListService;
 import customer.service.QrySparkTabNameService;
 import customer.util.Config;
 import customer.util.RedisUtil;
 import org.slf4j.Logger;
 import org.slf4j.LoggerFactory;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.jdbc.core.JdbcTemplate;
 import org.springframework.stereotype.Service;
 import org.springframework.web.multipart.MultipartFile;

 import java.io.InputStream;
 import java.util.*;

 @Service("customerListService")
 public class CustomerListServiceImpl
   implements CustomerListService {
   private static final Logger LOGGER = LoggerFactory.getLogger(customer.service.impl.CustomerListServiceImpl.class);
   
   @Autowired
   private CustomerListDao customerListDao;
   
//   @Autowired
//   private RedisUtil redisUtil;
   
   @Autowired
   private QrySparkTabNameService qrySparkTabNameService;
   
   @Autowired
   private JdbcTemplate jdbcTemplate;
 
   
   public JSONArray query(String number, String type, int start, int limit) {
     Map<String, Object> params = new HashMap<>();
     params.put("number", number);
     params.put("type", type);
     params.put("start", Integer.valueOf(start));
     params.put("limit", Integer.valueOf(limit));
     return this.customerListDao.query(params);
   }

   public JSONArray getCustTypes() {
     return this.customerListDao.getCustTypes();
   }

   public int delCustomerByNo(String number, String custType, String pdInstId) {
     Map<String, Object> params = new HashMap<>();
     params.put("number", number);
     params.put("custType", custType);
     int result = this.customerListDao.delCustomerByNo(params);
 /*
     if (result == 1) {
       long res = 0L;
       res = this.redisUtil.delSet(String.valueOf(Config.getObject("PDINSTID_REDIS_KEY")) + custType, pdInstId).longValue();
       if (res == result) {
         LOGGER.info("同步删除redis数据成功！ 受影响记录为: " + res + " 条");
       }
     } */
     return result;
   }
 
   public int getcustCount(String number, String type) {
     Map<String, Object> params = new HashMap<>();
     params.put("number", number);
     params.put("type", type);
     return this.customerListDao.getcustCount(params);
   }
 
   public int addCustomer(String number, String custType) {
     Map<String, Object> params = new HashMap<>();
     params.put("number", number);
     params.put("custType", custType);
     String custId = "";
     String pdInstId = "";
     int result = 0;
   /*  try {
       String numEnd = number.substring(number.length() - 1, number.length());
       custId = this.redisUtil.hashGet("MPHONE_USER_MAP_" + numEnd, String.valueOf(number) + "_C");
       pdInstId = this.redisUtil.hashGet("MPHONE_USER_MAP_" + numEnd, String.valueOf(number) + "_P");
       if (pdInstId != null) {
         params.put("custId", (custId == null) ? "" : custId);
         params.put("pdInstId", pdInstId);
       } else {
         throw new Exception("号码：" + number + " 无匹配的pdInstId !");
       } 
       
       result = this.customerListDao.addCustomer(params);
       if (result == 1) {
         long res = 0L;
         res = this.redisUtil.addWithSet(String.valueOf(Config.getObject("PDINSTID_REDIS_KEY")) + custType, new String[] { pdInstId }).longValue();
         if (res == result) {
           LOGGER.info("新增同步redis数据成功！ 受影响记录为: " + res + " 条");
         }
       } 
     } catch (Exception e) {
       e.printStackTrace();
       LOGGER.error("新增用户名单失败：号码：" + number + " 无匹配的pdInstId !" + e.getMessage());
     } */
     return result;
   }

   public long batchAdd(MultipartFile file, String type) {
     Map<String, Object> params = new HashMap<>();
     List<String> numbers = new ArrayList<>();
     
     List<Map<String, Object>> users = new ArrayList<>();
     InputStream in = null;
     String str = null;
     String number = "";
     long results = 0L;
     String custId = "";
     String pdInstId = "";
     byte[] data = new byte[1024];
     try {
       in = file.getInputStream();
       in.read(data);
       str = new String(data);
       System.out.println(str.trim());
       numbers = Arrays.asList(str.trim().split(","));
       for (String num : numbers) {
         Map<String, Object> param = new HashMap<>();
         number = num.trim();
         String numEnd = number.substring(number.length() - 1, number.length());
         
//         custId = this.redisUtil.hashGet("MPHONE_USER_MAP_" + numEnd, String.valueOf(number) + "_C");
//         pdInstId = this.redisUtil.hashGet("MPHONE_USER_MAP_" + numEnd, String.valueOf(number) + "_P");
         if (pdInstId != null) {
           param.put("no", number);
           param.put("custId", (custId == null) ? "" : custId);
           param.put("pdInstId", pdInstId);
         } else {
           throw new Exception("号码：" + num + " 无匹配的pdInstId !");
         } 
         
         if (query(number, type, 0, 0).size() == 1) {
           throw new Exception("号码：" + num + " 类型已存在 !");
         }
         users.add(param);
       } 
       
       params.put("users", users);
       params.put("custType", type);
       results = this.customerListDao.batchAdd(params);
       in.close();
       if (results == users.size()) {
         long res = 0L;
         for (Map<String, Object> paramRedis : users) {
//           this.redisUtil.addWithSet(String.valueOf(Config.getObject("PDINSTID_REDIS_KEY")) + type, new String[] { paramRedis.get("pdInstId").toString() });
           res++;
         } 
         
         if (res == results) {
           LOGGER.info("同步导入redis数据成功！ 受影响记录为: " + res + " 条");
         }
       } 
     } catch (Exception e) {
       e.printStackTrace();
       LOGGER.error("批量导入失败：" + e.getMessage(), e);
     } 
     return results;
   }
   private Map<String, Object> getUsrPdInstIdData(String no) {
     StringBuffer sql = new StringBuffer();
     String tableName = this.qrySparkTabNameService.qryUsrTabName();
     sql.append("select pd_inst_id as pdInstId,cust_id as custId,service_id as no,number_type as numberType, latn_id as latnId from  ");
     
     sql.append(String.valueOf(tableName) + " where service_id = " + no);
     System.out.println(sql.toString());
     Map<String, Object> mapObj = this.jdbcTemplate.queryForMap(sql.toString());
     LOGGER.info("queryPdInstIdDataSql = " + sql.toString());
     return mapObj;
   }

   public JSONArray getCustTypesInfo(String systemId) {
     JSONArray jsonObj = this.customerListDao.getCustTypesInfo(systemId);
     for (Object object : jsonObj) {
       JSONObject obj = (JSONObject)object;
       obj.put("redisKey", String.valueOf(Config.getObject("PDINSTID_REDIS_KEY")) + obj.getString("typeId"));
     } 
     return jsonObj;
   }
 }
