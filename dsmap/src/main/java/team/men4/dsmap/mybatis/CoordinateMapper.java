package team.men4.dsmap.mybatis;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import team.men4.dsmap.model.entity.Region;

import java.util.List;

@Repository
@Mapper
public interface CoordinateMapper {

    public List<Region> selectCorLv1(@Param("q1")String s1);

    public List<Region> selectCorLv2(@Param("q1")String s1, @Param("q2")String s2);

}
