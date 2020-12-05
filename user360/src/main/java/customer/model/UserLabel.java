 package customer.model;
 
 import java.io.Serializable;


 public class UserLabel
   implements Serializable
 {
   private static final long serialVersionUID = 1L;
   private String pdInstId;
   private String labelId;
   private String labelName;
   private String labelType;
   private String busiCaliber;
   private String updatSycle;
   private String scene;
   
   public UserLabel() {}
   
   public UserLabel(String pdInstId, String labelId, String labelName, String labelType, String busiCaliber, String updatSycle, String scene) {
     this.pdInstId = pdInstId;
     this.labelId = labelId;
     this.labelName = labelName;
     this.labelType = labelType;
     this.busiCaliber = busiCaliber;
     this.updatSycle = updatSycle;
     this.scene = scene;
   }
   public String getPdInstId() {
     return this.pdInstId;
   }
   public void setPdInstId(String pdInstId) {
     this.pdInstId = pdInstId;
   }
   public String getLabelId() {
     return this.labelId;
   }
   public void setLabelId(String labelId) {
     this.labelId = labelId;
   }
   public String getLabelName() {
     return this.labelName;
   }
   public void setLabelName(String labelName) {
     this.labelName = labelName;
   }
   public String getLabelType() {
     return this.labelType;
   }
   public void setLabelType(String labelType) {
     this.labelType = labelType;
   }
   public String getBusiCaliber() {
     return this.busiCaliber;
   }
   public void setBusiCaliber(String busiCaliber) {
     this.busiCaliber = busiCaliber;
   }
   public String getUpdatSycle() {
     return this.updatSycle;
   }
   public void setUpdatSycle(String updatSycle) {
     this.updatSycle = updatSycle;
   }
   public String getScene() {
     return this.scene;
   }
   public void setScene(String scene) {
     this.scene = scene;
   }
   
   public String toString() {
     return "UserLabel [pdInstId=" + this.pdInstId + ", labelId=" + this.labelId + ", labelName=" + this.labelName + ", labelType=" + this.labelType + ", busiCaliber=" + this.busiCaliber + ", updatSycle=" + this.updatSycle + ", scene=" + this.scene + "]";
   }
 }


