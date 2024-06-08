package team.men4.dsmap.mybatis;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import team.men4.dsmap.service.model.entity.RegionWithMessages;

import java.time.LocalDateTime;
import java.util.List;

@Repository
@Mapper
public interface MessageMapper {

    public List<RegionWithMessages> selectMsg(
            @Param("d1") LocalDateTime d1,
            @Param("d2") LocalDateTime d2,
            @Param("q1") String q1,
            @Param("q2") String q2,
            @Param("q3") String q3
    );

    public List<RegionWithMessages> selectMsgAll();
}
