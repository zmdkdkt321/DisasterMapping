package team.men4.dsmap.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.men4.dsmap.model.entity.Region;
import team.men4.dsmap.model.entity.Total;
import team.men4.dsmap.mybatis.CoordinateMapper;
import team.men4.dsmap.mybatis.TotalMapper;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional
public class CoordinateService {

    @Autowired
    CoordinateMapper coordinateMapper;

    public List<Region> selectCorLv1() {
        List<Region> list = new ArrayList<>();
        try{
            list = coordinateMapper.selectCorLv1("경상남도");
        }catch (Exception e){
            e.printStackTrace();
        }
        return list;
    }

    public List<Region> selectCorLv2() {
        List<Region> list = new ArrayList<>();
        try{
            list = coordinateMapper.selectCorLv2("경상남도", "진주시");
        }catch (Exception e){
            e.printStackTrace();
        }
        return list;
    }
}
