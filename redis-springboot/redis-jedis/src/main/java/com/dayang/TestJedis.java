package com.dayang;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.Transaction;

import java.util.Set;

public class TestJedis {

    public static void main(String[] args) {
        Jedis jedis = new Jedis("192.168.18.129", 6379);
/*
        System.out.println(jedis.ping());

        Set<String> keys = jedis.keys("*");
        System.out.println(keys);*/

        String money = jedis.get("money");
        System.out.println(money);

        String money1 = jedis.watch("money");
        //开启事务
        Transaction multi = jedis.multi();
        try {
            multi.decrBy("money", 100);
            multi.incrBy("out", 100);
            multi.exec();
        } catch (Exception e) {
            multi.discard();
            multi.unwatch();
            jedis.unwatch();
            e.printStackTrace();
        } finally {
            jedis.close();
        }

        String money2 = jedis.get("money");
        System.out.println("事务执行后money " + money2);
        String out = jedis.get("out");
        System.out.println("事务执行后out  " + out);

    }
}
