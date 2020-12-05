 package customer.util;

 import org.springframework.beans.factory.annotation.Autowired;
 import redis.clients.jedis.JedisCluster;
 import redis.clients.jedis.Tuple;

 import java.util.List;
 import java.util.Map;
 import java.util.Set;


 public class RedisUtil
 {
   @Autowired(required = false)
   private JedisCluster jedisCluster;
   
   public Set<String> sunion(String... keys) {
     return this.jedisCluster.sunion(keys);
   }
 
 
 
 
   
   public Set<String> sinter(String... keys) {
     return this.jedisCluster.sinter(keys);
   }
 
 
 
 
 
 
   
   public Long sinterstore(String dstkey, String... keys) {
     return this.jedisCluster.sinterstore(dstkey, keys);
   }
 
 
 
 
 
 
 
 
 
   
   public Long delKey(String key) {
     Long result = Long.valueOf(0L);
     Boolean exsist = this.jedisCluster.exists(key);
     if (exsist.booleanValue()) {
       result = this.jedisCluster.del(key);
     }
     return result;
   }
 
 
 
 
 
 
   
   public Long hdelKey(String key, String[] field) {
     return this.jedisCluster.hdel(key, field);
   }
 
 
 
 
 
 
 
 
 
   
   public Long hdelkey(String key, String field) {
     return this.jedisCluster.hdel(key, new String[] { field });
   }
 
 
 
 
 
 
 
 
 
 
   
   public Long expire(String key, int expire) {
     return this.jedisCluster.expire(key, expire);
   }
 
 
 
 
 
 
 
 
   
   public Boolean exists(String key) {
     return this.jedisCluster.exists(key);
   }
 
 
 
 
 
 
 
   
   public List<String> sort(String key) {
     return this.jedisCluster.sort(key);
   }
 
 
 
 
 
 
 
 
   
   public long makeId(String key) {
     long id = this.jedisCluster.incr(key).longValue();
     if (id + 75807L >= Long.MAX_VALUE)
     {
       this.jedisCluster.getSet(key, "0");
     }
     return id;
   }
 
 
 
 
 
 
 
 
 
 
 
 
 
   
   public String setString(String key, String value) {
     return this.jedisCluster.set(key, value);
   }
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
   
   public String setString(String key, String value, int expire) {
     return this.jedisCluster.setex(key, expire, value);
   }
 
 
 
 
 
 
 
 
 
   
   public Long setStringIfNotExists(String key, String value) {
     return this.jedisCluster.setnx(key, value);
   }
 
 
 
 
 
 
 
 
 
   
   public String getString(String key) {
     return this.jedisCluster.get(key);
   }
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
   
   public Long hashSet(String key, String field, String value) {
     return this.jedisCluster.hset(key, field, value);
   }
 
 
 
 
 
 
 
 
 
 
 
   
   public String hashGet(String key, String field) {
     return this.jedisCluster.hget(key, field);
   }
 
 
 
 
 
 
 
 
 
 
 
   
   public String hashMultipleSet(String key, Map<String, String> hash) {
     return this.jedisCluster.hmset(key, hash);
   }
 
 
 
 
 
 
 
 
 
 
   
   public List<String> hashMultipleGet(String key, String... fields) {
     return this.jedisCluster.hmget(key, fields);
   }
 
 
 
 
 
 
 
 
 
 
 
   
   public Map<String, String> hashGetAll(String key) {
     return this.jedisCluster.hgetAll(key);
   }
 
 
 
 
 
 
 
 
 
   
   public Long listPushTail(String key, String... values) {
     return this.jedisCluster.rpush(key, values);
   }
 
 
 
 
 
 
   
   public Long listPushHead(String key, String... values) {
     return this.jedisCluster.lpush(key, values);
   }
 
 
 
 
 
 
 
 
   
   public List<String> listGetAll(String key) {
     return this.jedisCluster.lrange(key, 0L, -1L);
   }
 
 
 
 
 
 
 
 
 
   
   public List<String> listRange(String key, long beginIndex, long endIndex) {
     return this.jedisCluster.lrange(key, beginIndex, endIndex - 1L);
   }
 
 
 
 
 
 
 
 
   
   public Long lrem(String key, String value) {
     return this.jedisCluster.lrem(key, 0L, value);
   }
 
 
 
 
 
 
 
 
   
   public Long addWithSet(String key, String... members) {
     return this.jedisCluster.sadd(key, members);
   }
 
 
 
 
 
 
 
 
 
 
 
 
 
   
   public String getSrandmember(String key) {
     return this.jedisCluster.srandmember(key);
   }
 
 
 
 
 
 
 
 
 
   
   public boolean sismember(String key, String value) {
     return this.jedisCluster.sismember(key, value).booleanValue();
   }
 
 
 
 
 
 
 
 
   
   public Long scard(String key) {
     return this.jedisCluster.scard(key);
   }
 
 
 
 
 
   
   public Set<String> smembers(String key) {
     return this.jedisCluster.smembers(key);
   }
 
 
 
 
 
 
 
   
   public Long delSet(String key, String member) {
     return this.jedisCluster.srem(key, new String[] { member });
   }
 
 
 
 
 
 
 
 
 
   
   public Long addWithSortedSet(String key, double score, String member) {
     return this.jedisCluster.zadd(key, score, member);
   }
 
 
 
 
 
 
 
 
   
   public Long delSortedSet(String key, String members) {
     return this.jedisCluster.zrem(key, new String[] { members });
   }
 
 
 
 
 
   
   public Long addWithSortedSet(String key, Map<String, Double> scoreMembers) {
     return this.jedisCluster.zadd(key, scoreMembers);
   }
 
 
 
 
 
 
   
   public Set<Tuple> revrangeByScore(String key) {
     return this.jedisCluster.zrevrangeWithScores(key, 0L, -1L);
   }
 
 
 
 
 
 
 
 
   
   public Set<String> revrangeByScoreWithSortedSet(String key, double max, double min) {
     return this.jedisCluster.zrevrangeByScore(key, max, min);
   }
 
   
   public JedisCluster getJedisCluster() {
     return this.jedisCluster;
   }
 
   
   public void setJedisCluster(JedisCluster jedisCluster) {
     this.jedisCluster = jedisCluster;
   }
 }


