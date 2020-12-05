package com.dayang;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.core.ZSetOperations;

@SpringBootTest
class RedisSpringbootApplicationTests {

    @Autowired
    private RedisTemplate<String,Object> redisTemplate;

    @Test
    void contextLoads() {
        ZSetOperations<String, Object> zset = redisTemplate.opsForZSet();
        zset.add("score","jacket ma",1000000);
        zset.add("score","qiangdong liu",30000);
        zset.add("score","hongsheng zhai",50000000);
        System.out.println(zset.range("score", 0, -1));
        System.out.println(zset.rangeByScoreWithScores("score", 0, 670000000));
    }

    @Test
    public void test() {
        ValueOperations<String, Object> stringType = redisTemplate.opsForValue();
        stringType.set("name","马斯克");
        stringType.set("age",45);
        stringType.set("job","CEO");
        stringType.set("sex","男");
        System.out.println(stringType.get("name"));
    }
    
    @Test
    public void test1() {
        ListOperations<String, Object> list = redisTemplate.opsForList();
        list.leftPush("姓名","特朗普");
        list.leftPush("姓名","拜登");
        System.out.println(list.range("姓名", 0, -1));


    }

}
