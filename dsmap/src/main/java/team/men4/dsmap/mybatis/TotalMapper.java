package team.men4.dsmap.mybatis;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import team.men4.dsmap.service.model.entity.Total;

import java.util.List;

@Repository
@Mapper
public interface TotalMapper {
    public List<Total> selectTotal();

    public List<Integer> selectTotalByRegion(
            @Param("q1")String s1,
            @Param("q2")String s2,
            @Param("q3")String s3);
}
