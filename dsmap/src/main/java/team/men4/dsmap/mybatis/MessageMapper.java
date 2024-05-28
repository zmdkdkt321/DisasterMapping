package team.men4.dsmap.mybatis;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import team.men4.dsmap.model.entity.Message;
import team.men4.dsmap.model.entity.Region;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
@Mapper
public interface MessageMapper {

    public List<Message> selectMsg3(
            @Param("d1") LocalDateTime d1,
            @Param("d2") LocalDateTime d2,
            @Param("q1") String s1,
            @Param("q2") String s2,
            @Param("q3") String s3);

    public List<Message> selectMsg2(
            @Param("d1") LocalDateTime d1,
            @Param("d2") LocalDateTime d2,
            @Param("q1") String s1,
            @Param("q2") String s2);

    public List<Message> selectMsg1(
            @Param("d1") LocalDateTime d1,
            @Param("d2") LocalDateTime d2,
            @Param("q1") String s1
    );
}
