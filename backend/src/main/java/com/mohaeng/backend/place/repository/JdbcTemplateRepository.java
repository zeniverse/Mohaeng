package com.mohaeng.backend.place.repository;

import com.mohaeng.backend.place.domain.Place;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
@RequiredArgsConstructor
public class JdbcTemplateRepository {

    private final JdbcTemplate jdbcTemplate;
    private SimpleJdbcInsert simpleJdbcInsert;

    public void setDataSource(List<Place> temp) {
        this.simpleJdbcInsert = new SimpleJdbcInsert((DataSource) temp).withTableName("place");
    }

    public void add(Place place) {
        Map<String, Object> parameters = new HashMap<>(9);
//        parameters.put("id", place.getId());
        parameters.put("name", place.getName());
        parameters.put("addr", place.getAddr1());
        parameters.put("areacode", place.getAreaCode());
        parameters.put("firstimage", place.getFirstImage());
        parameters.put("firstimage2", place.getFirstImage2());
        parameters.put("mapx", place.getMapX());
        parameters.put("mapy", place.getMapY());
        parameters.put("sigungucode", place.getSigunguCode());
        parameters.put("contentid", place.getSigunguCode());
//        parameters.put("overview", place.getOverview());
        simpleJdbcInsert.execute(parameters);
    }





    public void batchInsert(List<Place> temp) {

        jdbcTemplate.batchUpdate("INSERT INTO place(" +
                        "`name`, " +
                        "`addr1`," + "`areacode`," +
                        "`firstimage`," + "`firstimage2`," +
                        "`mapx`,`mapy`," +
                        "`sigungucode`,`contentid`)" +
                        "VALUES (?,?,?,?,?,?,?,?,?)",
                new BatchPreparedStatementSetter() {
                    @Override
                    public void setValues(PreparedStatement ps, int i) throws SQLException {

//                        ps.setObject(1,temp.get(i).getId(),Types.VARCHAR);
                        ps.setObject(1, temp.get(i).getName(), Types.VARCHAR);
                        ps.setObject(2, temp.get(i).getAddr1(), Types.VARCHAR);
                        ps.setObject(3, temp.get(i).getAreaCode(), Types.VARCHAR);
                        ps.setObject(4, temp.get(i).getFirstImage(), Types.VARCHAR);
                        ps.setObject(5, temp.get(i).getFirstImage2(), Types.VARCHAR);
                        ps.setObject(6, temp.get(i).getMapX(), Types.VARCHAR);
                        ps.setObject(7, temp.get(i).getMapY(), Types.VARCHAR);
                        ps.setObject(8, temp.get(i).getSigunguCode(), Types.VARCHAR);
                        ps.setObject(9, temp.get(i).getContentId(), Types.VARCHAR);
                    }

                    @Override
                    public int getBatchSize() {
                        return temp.size();
                    }
                });
    }
}
