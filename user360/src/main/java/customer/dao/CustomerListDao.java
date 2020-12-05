package customer.dao;

import com.alibaba.fastjson.JSONArray;

import java.util.Map;

public interface CustomerListDao {
  JSONArray query(Map<String, Object> paramMap);
  
  JSONArray getCustTypes();
  
  int delCustomerByNo(Map<String, Object> paramMap);
  
  int getcustCount(Map<String, Object> paramMap);
  
  int addCustomer(Map<String, Object> paramMap);
  
  long batchAdd(Map<String, Object> paramMap);
  
  JSONArray getCustTypesInfo(String paramString);
}


