package team.men4.dsmap.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.men4.dsmap.model.entity.Region;
import team.men4.dsmap.model.entity.Total;
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

    public int selectTotalByRegion(Region region) {
        int num =0;
        try{
            List<Integer> list= totalMapper.selectTotalByRegion(region.getLv1Name(), region.getLv2Name(), region.getLv3Name());

            if(!list.isEmpty()){
                log.info(list.toString());

                for(int n : list){
                    num +=n;
                }
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return num;
    }
}
