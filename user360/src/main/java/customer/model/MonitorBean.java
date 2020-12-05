 package customer.model;
 
 import java.io.Serializable;


 public class MonitorBean
   implements Serializable
 {
   private static final long serialVersionUID = 1L;
   private String id;
   private String name;
   private String event_code;
   private String create_time;
   private String status;
   private String config;
   private String event_type_id;
   
   public MonitorBean() {}
   
   public MonitorBean(String id, String name, String event_code, String create_time, String status, String config, String event_type_id) {
     this.id = id;
     this.name = name;
     this.event_code = event_code;
     this.create_time = create_time;
     this.status = status;
     this.config = config;
     this.event_type_id = event_type_id;
   }
   public String getid() {
     return this.id;
   }
   public void setid(String id) {
     this.id = id;
   }
   public String getname() {
     return this.name;
   }
   public void setname(String name) {
     this.name = name;
   }
   public String getevent_code() {
     return this.event_code;
   }
   public void setevent_code(String event_code) {
     this.event_code = event_code;
   }
   public String getcreate_time() {
     return this.create_time;
   }
   public void setcreate_time(String create_time) {
     this.create_time = create_time;
   }
   public String getstatus() {
     return this.status;
   }
   public void setstatus(String status) {
     this.status = status;
   }
   public String getconfig() {
     return this.config;
   }
   public void setconfig(String config) {
     this.config = config;
   }
   public String getevent_type_id() {
     return this.event_type_id;
   }
   public void setevent_type_id(String event_type_id) {
     this.event_type_id = event_type_id;
   }
   
   public String toString() {
     return "UserLabel [id=" + this.id + ", name=" + this.name + ", event_code=" + this.event_code + ", create_time=" + this.create_time + ", status=" + this.status + ", config=" + this.config + ", event_type_id=" + this.event_type_id + "]";
   }
 }


