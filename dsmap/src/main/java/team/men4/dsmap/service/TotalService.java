package team.men4.dsmap.service;

import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import team.men4.dsmap.model.User;
import team.men4.dsmap.model.entity.Region;
import team.men4.dsmap.model.entity.Total;
import team.men4.dsmap.mybatis.TestMapper;
import team.men4.dsmap.mybatis.TotalMapper;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional
public class TotalService {

    @Autowired
    TotalMapper totalMapper;

    public List<Total> selectTotal() {
        List<Total> list = new ArrayList<>();
        try{
            list = totalMapper.selectTotal();
        }catch(Exception e){
            e.printStackTrace();
        }
        return  list;
    }

    public Total selectTotalByRegion(Region region) {

        Total totalByRegion = new Total(region.getLv2Name());
        try{
            List<Integer> list= totalMapper.selectTotalByRegion(region.getLv1Name(), region.getLv2Name(), region.getLv3Name());

            if(!list.isEmpty()){
                log.info(list.toString());
            }else{
                log.info("empty");
            }
        }catch(Exception e){
            e.printStackTrace();
        }


        if(totalByRegion == null){
            log.info("null ");
        }
        return totalByRegion;
    }
}
