 package customer.controller;

 import com.alibaba.fastjson.JSONArray;
 import com.alibaba.fastjson.JSONObject;
 import customer.service.CustomerListService;
 import org.slf4j.Logger;
 import org.slf4j.LoggerFactory;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.stereotype.Controller;
 import org.springframework.web.bind.annotation.RequestMapping;
 import org.springframework.web.bind.annotation.RequestMethod;
 import org.springframework.web.bind.annotation.RequestParam;
 import org.springframework.web.multipart.MultipartFile;
 import org.springframework.web.servlet.ModelAndView;

 import javax.servlet.http.HttpServletRequest;
 import javax.servlet.http.HttpServletResponse;
 import java.io.IOException;
 import java.util.Map;


 @Controller
 @RequestMapping({"/query"})
 public class CustomerListController
 {

   private static final Logger LOGGER = LoggerFactory.getLogger(customer.controller.CustomerListController.class);

   @Autowired
   private CustomerListService customerListService;

   @RequestMapping(value = {"/customerList"}, method = {RequestMethod.GET})
   public ModelAndView customerList(HttpServletRequest request, HttpServletResponse response) throws IOException {
     return new ModelAndView("customerList", (Map<String, ?>) null);
   }
 
 
   @RequestMapping(value = {"/getCustTypes"}, method = {RequestMethod.POST})
   public String getCustTypes(HttpServletRequest request, HttpServletResponse response) throws IOException {
     JSONObject custTypes = new JSONObject();
     JSONArray listJsonObjs = new JSONArray();
     
     try {
       response.setContentType("text/html");
       response.setCharacterEncoding("UTF-8");
       listJsonObjs = this.customerListService.getCustTypes();
       custTypes.put("custTypes", listJsonObjs);
       response.getWriter().print(custTypes);
     } catch (Exception e) {
       response.setStatus(500);
       response.setHeader("err_msg", "An error occured When excute orderSubscribe method\n" + e.getMessage());
       LOGGER.error(e.getMessage(), e);
     } 
     return null;
   }

   @RequestMapping(value = {"/getCustomerList"}, method = {RequestMethod.POST})
   public String getCustomerList(HttpServletRequest request, HttpServletResponse response) throws IOException {
     JSONObject customerList = new JSONObject();
     JSONArray listJsonObjs = new JSONArray();
     String number = "";
     String type = "";
     int start = 0;
     int limit = 0;
     try {
       request.setCharacterEncoding("utf-8");
       response.setContentType("text/html");
       response.setCharacterEncoding("UTF-8");
       number = request.getParameter("number");
       if (request.getParameter("type") != null) {
         type = new String(request.getParameter("type").getBytes("ISO-8859-1"), "UTF-8");
       }
       if (request.getParameter("start") != null && request.getParameter("limit") != null) {
         start = Integer.parseInt(request.getParameter("start"));
         limit = Integer.parseInt(request.getParameter("limit"));
       } 
       listJsonObjs = this.customerListService.query(number, type, start - 1, limit);
       int custTotalCount = this.customerListService.getcustCount(number, type);
       customerList.put("custTotalCount", Integer.valueOf(custTotalCount));
       customerList.put("customerList", listJsonObjs);
       response.getWriter().print(customerList);
     } catch (Exception e) {
       response.setStatus(500);
       response.setHeader("err_msg", "An error occured When excute orderSubscribe method\n" + e.getMessage());
       LOGGER.error(e.getMessage(), e);
     } 
     return null;
   }

   @RequestMapping(value = {"/delCustByNo"}, method = {RequestMethod.POST})
   public String delCustByNo(HttpServletRequest request, HttpServletResponse response) throws IOException {
     JSONObject message = new JSONObject();
     
     try {
       request.setCharacterEncoding("utf-8");
       response.setContentType("text/html");
       response.setCharacterEncoding("UTF-8");
       String number = request.getParameter("number");
       String type = request.getParameter("type");
       String pdInstId = request.getParameter("pdInstId");
       int result = this.customerListService.delCustomerByNo(number, type, pdInstId);
       if (result == 1) {
         message.put("message", "Y");
       }
       response.getWriter().print(message);
     } catch (Exception e) {
       message.put("message", "N");
       response.getWriter().print(message);
       response.setStatus(500);
       response.setHeader("err_msg", "An error occured When excute orderSubscribe method\n" + e.getMessage());
       LOGGER.error(e.getMessage(), e);
     } 
     return null;
   }

   @RequestMapping(value = {"/addCustomer"}, method = {RequestMethod.POST})
   public String addCustomer(HttpServletRequest request, HttpServletResponse response) throws IOException {
     JSONObject message = new JSONObject();
     try {
       request.setCharacterEncoding("utf-8");
       response.setContentType("text/html");
       response.setCharacterEncoding("UTF-8");
       String number = request.getParameter("number");
       String custType = new String(request.getParameter("custType").getBytes("ISO-8859-1"), "UTF-8");
       int result = this.customerListService.addCustomer(number, custType);
       if (result == 1) {
         message.put("message", "Y");
       } else {
         message.put("message", "N");
       } 
       response.getWriter().print(message);
     } catch (Exception e) {
       message.put("message", "N");
       response.getWriter().print(message);
       response.setStatus(500);
       response.setHeader("err_msg", "An error occured When excute orderSubscribe method\n" + e.getMessage());
       LOGGER.error(e.getMessage(), e);
     } 
     return null;
   }
 

   @RequestMapping(value = {"/batchAdd"}, method = {RequestMethod.POST})
   public String batchAddCustomer(@RequestParam("fileField") MultipartFile file, HttpServletRequest request, HttpServletResponse response) throws IOException {
     JSONObject message = new JSONObject();
     try {
       request.setCharacterEncoding("utf-8");
       response.setContentType("text/html");
       response.setCharacterEncoding("UTF-8");
       String type = new String(request.getParameter("custType").getBytes("ISO-8859-1"), "UTF-8");
       long result = this.customerListService.batchAdd(file, type);
       if (result > 0L) {
         message.put("message", "Y");
       } else {
         message.put("message", "N");
       } 
       response.getWriter().print(message);
     } catch (Exception e) {
       message.put("message", "N");
       response.getWriter().print(message);
       response.setStatus(500);
       response.setHeader("err_msg", "An error occured When excute orderSubscribe method\n" + e.getMessage());
       LOGGER.error(e.getMessage(), e);
     } 
     return null;
   }
 
   @RequestMapping({"/getCustTypesInfo"})
   public String getCustTypesInfo(HttpServletRequest request, HttpServletResponse response) throws IOException {
     JSONObject custTypes = new JSONObject();
     JSONArray listJsonObjs = new JSONArray();
     try {
       response.setContentType("text/html");
       response.setCharacterEncoding("UTF-8");
       String systemId = request.getParameter("systemId");
       listJsonObjs = this.customerListService.getCustTypesInfo(systemId);
       custTypes.put("root", listJsonObjs);
       custTypes.put("resultCode", "1");
       custTypes.put("resultDesc", "成功");
     } catch (Exception e) {
       custTypes.put("root", listJsonObjs);
       custTypes.put("resultCode", "0");
       custTypes.put("resultDesc", "失败");
       response.setStatus(500);
       response.setHeader("err_msg", "An error occured When excute orderSubscribe method\n" + e.getMessage());
       LOGGER.error(e.getMessage(), e);
     } finally {
       response.getWriter().print(custTypes);
     } 
     return null;
   }
 }
