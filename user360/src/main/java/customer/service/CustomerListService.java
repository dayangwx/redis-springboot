package customer.service;

import com.alibaba.fastjson.JSONArray;
import org.springframework.web.multipart.MultipartFile;

public interface CustomerListService {
  JSONArray query(String paramString1, String paramString2, int paramInt1, int paramInt2);
  
  int delCustomerByNo(String paramString1, String paramString2, String paramString3);
  
  JSONArray getCustTypes();
  
  int getcustCount(String paramString1, String paramString2);
  
  int addCustomer(String paramString1, String paramString2);
  
  long batchAdd(MultipartFile paramMultipartFile, String paramString);
  
  JSONArray getCustTypesInfo(String paramString);
}


