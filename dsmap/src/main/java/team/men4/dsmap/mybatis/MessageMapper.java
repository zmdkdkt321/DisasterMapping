package team.men4.dsmap.mybatis;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import team.men4.dsmap.model.entity.RegionWithMessage;
import team.men4.dsmap.model.entity.RegionWithMessages;

import java.time.LocalDateTime;
import java.util.List;

@Repository
@Mapper
public interface MessageMapper {

    public List<RegionWithMessage> selectPage(
            @Param("s") String s,
            @Param("e") String e,
            @Param("q1") String q1,
            @Param("q2") String q2,
            @Param("q3") String q3,
            @Param("offset") int offset
    );

    public Integer selectNum(
            @Param("s") String s,
            @Param("e") String e,
            @Param("q1") String q1,
            @Param("q2") String q2,
            @Param("q3") String q3
    );


    public List<RegionWithMessages> selectMsgAll(@Param("s") String s, @Param("e") String e);
}
