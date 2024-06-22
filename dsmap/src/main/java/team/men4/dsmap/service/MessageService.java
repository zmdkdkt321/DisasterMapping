package team.men4.dsmap.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.men4.dsmap.model.dto.MessageDto;
import team.men4.dsmap.model.dto.MessageListDto;
import team.men4.dsmap.model.dto.RegionWithMessageDto;
import team.men4.dsmap.model.dto.RegionWithMessagesDto;
import team.men4.dsmap.model.entity.Message;
import team.men4.dsmap.model.entity.RegionWithMessage;
import team.men4.dsmap.model.entity.RegionWithMessages;
import team.men4.dsmap.mybatis.MessageMapper;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class MessageService {
    @Autowired
    private final MessageMapper messageMapper;

    public List<RegionWithMessagesDto> selectMsgAll() {
        List<RegionWithMessages> list = new ArrayList<>();


        LocalDate currentDate = LocalDate.now();
        LocalDate nextDate = currentDate.plusDays(1);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        // 날짜를 문자열로 변환합니다
        String start = currentDate.format(formatter);
        String end = nextDate.format(formatter);
        log.info("{} {}", start, end);
        try{
            list = messageMapper.selectMsgAll(start, end);
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
//            log.info("{} {} {} {} ",entity.getId(), name, entity.getX(), entity.getY());

            List<MessageDto> messages = new ArrayList<>();

            for(Message m : entity.getMessages()){
                String d = m.getDate().toString();
                String[] srr = d.split("T");

                MessageDto messageDto = new MessageDto(m.getId(), m.getContent(), srr[0], srr[1]);
                messages.add(messageDto);
            }

            String numberString = Long.toString(entity.getCode()); // 숫자를 문자열로 변환
            String shortenedNumberString = numberString.substring(0, 5); // 원하는 부분만 잘라냄
            long shortenedNumber = Long.parseLong(shortenedNumberString);


            RegionWithMessagesDto dto = new RegionWithMessagesDto(
                    entity.getId(),
                    name,
                    shortenedNumber,
                    entity.getX(),
                    entity.getY(),
                    entity.getMessages().size(),
                    messages);
            dtoList.add(dto);
        }


        return dtoList;
    }


    public MessageListDto selectPage(int offset, String lv1_name, String lv2_name, String lv3_name, String start, String end) {

        List<RegionWithMessage> list = new ArrayList<>();
        MessageListDto messageListDto = new MessageListDto();
        int num = 0;


        if(start.equals(end)){

            LocalDate currentDate = LocalDate.parse(start);
            LocalDate nextDate = currentDate.plusDays(1);

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

            // 날짜를 문자열로 변환합니다
            end = nextDate.format(formatter);
        }

        try{
            list = messageMapper.selectPage(start, end,
                    lv1_name, lv2_name, lv3_name,
                    offset
            );
        }catch (Exception e){
            e.printStackTrace();
        }
        if(list.isEmpty()) return messageListDto;

        List<RegionWithMessageDto> messageDtoList = new ArrayList<>();

        for(RegionWithMessage msg : list){

            String name  = msg.getLv1Name();
            String ext = msg.getDate().toString();
            String[] srr = ext.split("T");

            if(!name.equals(msg.getLv2Name())){
                if(!msg.getLv2Name().equals("None")){
                    name += " "+msg.getLv2Name();}
            }
            if(!msg.getLv3Name().equals("None")){
                name += " "+msg.getLv3Name();
            }
            RegionWithMessageDto message = new RegionWithMessageDto(
                    name, msg.getContent(), srr[0]);

            messageDtoList.add(message);
        }

        num = selectNum(start, end, lv1_name, lv2_name, lv3_name);

        messageListDto.setMessages(messageDtoList);
        messageListDto.setOffset(offset);
        messageListDto.setSize(num);

        return messageListDto;
    }


    public Integer selectNum(String s, String d, String lv1_name, String lv2_name, String lv3_name) {
        Integer integer = messageMapper.selectNum(
                s, d, lv1_name, lv2_name, lv3_name);
        return integer;
    }

    }
