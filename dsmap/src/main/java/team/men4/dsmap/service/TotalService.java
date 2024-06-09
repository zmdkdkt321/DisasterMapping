package team.men4.dsmap.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.men4.dsmap.model.dto.RegionDto;
import team.men4.dsmap.model.dto.TotalDto;
import team.men4.dsmap.model.entity.Total;
import team.men4.dsmap.mybatis.TotalMapper;

import java.util.ArrayList;
import java.util.List;
// TODO [spring] 예외 처리 보강
// TODO [spring] 리팩토링
@Slf4j
@Service
@Transactional
public class TotalService {
    @Autowired
    TotalMapper totalMapper;

    public List<TotalDto> selectTotal() {
        List<TotalDto> dtoList = new ArrayList<>();
        List<Total> list = new ArrayList<>();

        try{
            list = totalMapper.selectTotal();
        }catch(Exception e){
            e.printStackTrace();
        }

        for(Total t: list){
            String name = t.getName();
            String extName = convertName(name);
            dtoList.add(new TotalDto(t.getName(), extName, t.getCount()));
        }
        return  dtoList;
    }

    public String convertName(String name){
        String[] str = name.split("");
        String extName = str[0];

        if(str.length == 4){
            extName += str[2];
        }else{
            extName += str[1];
        }
        return extName;
    }


    public int selectTotalByRegion(RegionDto region) {
        List<Integer>  list = new ArrayList<>();

        try{
            list= totalMapper.selectTotalByRegion(region.getLv1_name(), region.getLv2_name(), region.getLv3_name());

        }catch(Exception e){ e.printStackTrace(); }

        int num = sum(list);
        return num;
    }

    public int sum(List<Integer> list){
        if(list.size() < 1) return 0;

        int num =0;
        for(int n : list){
            num +=n;
        }
        return num;
    }
}
