package team.men4.dsmap.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.men4.dsmap.model.entity.Message;
import team.men4.dsmap.mybatis.MessageMapper;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional
public class MessageService {

    @Autowired
    MessageMapper messageMapper;

    public List<Message> selectMsg3() {
        List<Message> list = new ArrayList<>();
        try{
            list = messageMapper.selectMsg3(
                    LocalDateTime.of(2024, 1, 1 ,0, 0,0),
                    LocalDateTime.of(2024,5,26,23,50),
                    "경상남도",
                    "진주시",
                    "호탄동"
                    );
        }catch (Exception e){
            e.printStackTrace();
        }
        return list;
    }

    public List<Message> selectMsg2() {
        List<Message> list = new ArrayList<>();
        try{
            list = messageMapper.selectMsg2(
                    LocalDateTime.of(2024, 1, 1 ,0, 0,0),
                    LocalDateTime.of(2024,5,26,23,50),
                    "경상남도",
                    "진주시"
            );
        }catch (Exception e){
            e.printStackTrace();
        }
        return list;
    }

    public List<Message> selectMsg1() {
        List<Message> list = new ArrayList<>();
        try{
            list = messageMapper.selectMsg1(
                    LocalDateTime.of(2024, 1, 1 ,0, 0,0),
                    LocalDateTime.of(2024,5,26,23,50),
                    "경상남도"
            );
        }catch (Exception e){
            e.printStackTrace();
        }
        return list;
    }


}
