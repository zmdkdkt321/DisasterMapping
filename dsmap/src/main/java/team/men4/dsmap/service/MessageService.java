package team.men4.dsmap.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.men4.dsmap.model.dto.MessageDto;
import team.men4.dsmap.model.dto.RegionWithMessagesDto;
import team.men4.dsmap.model.entity.Message;
import team.men4.dsmap.model.entity.RegionWithMessages;
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


    public List<RegionWithMessagesDto> selectMsgAll() {
        List<RegionWithMessages> list = new ArrayList<>();
        try{
            list = messageMapper.selectMsgAll();
        }catch (Exception e){
            e.printStackTrace();
        }

        int num =0;
        for(RegionWithMessages  m : list){
            num += m.getMessages().size();
        }
        log.info("lv1 tuple: {}", num);


        List<RegionWithMessagesDto> dtoList = new ArrayList<>();

        for(RegionWithMessages entity : list){

            String name  = entity.getLv1Name();

            if(!name.equals(entity.getLv2Name())){

                if(!entity.getLv2Name().equals("None")){
                    name += " "+entity.getLv2Name();}
            }
            if(!entity.getLv3Name().equals("None")){
                name += " "+entity.getLv3Name();
            }
            log.info("{} {} {} {} ",entity.getId(), name, entity.getX(), entity.getY());

            List<MessageDto> messages = new ArrayList<>();

            for(Message m : entity.getMessages()){
                String d = m.getDate().toString();
                String[] srr = d.split("T");

                MessageDto messageDto = new MessageDto(m.getId(), m.getContent(), srr[0], srr[1]);
                messages.add(messageDto);
            }

            RegionWithMessagesDto dto = new RegionWithMessagesDto(
                    entity.getId(),
                    name,
                    entity.getX(),
                    entity.getY(),
                    entity.getMessages().size(),
                    messages);
            dtoList.add(dto);
        }


        return dtoList;
    }


    public List<RegionWithMessages> selectMsg() {
        List<RegionWithMessages> list = new ArrayList<>();
        try{
            list = messageMapper.selectMsg(
                    LocalDateTime.of(2024, 1, 1 ,0, 0,0),
                    LocalDateTime.of(2024,5,26,23,50),
                    "부산광역시",null, null
            );
        }catch (Exception e){
            e.printStackTrace();
        }

        int num =0;
        for(RegionWithMessages  m : list){
            num += m.getMessages().size();
        }
        log.info("lv1 tuple: {}", num);

        return list;
    }
}
