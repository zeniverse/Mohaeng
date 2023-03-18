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
        Map<String, Object> parameters = new HashMap<>(11);
        parameters.put("id", place.getId());
        parameters.put("name", place.getName());
        parameters.put("addr", place.getAddr1());
        parameters.put("areacode", place.getAreacode());
        parameters.put("firstimage", place.getFirstimage());
        parameters.put("firstimage2", place.getFirstimage2());
        parameters.put("mapx", place.getMapx());
        parameters.put("mapy", place.getMapy());
        parameters.put("sigungucode", place.getSigungucode());
        parameters.put("contentid", place.getContentid());
        parameters.put("overview", place.getOverview());
        simpleJdbcInsert.execute(parameters);
    }





    public void batchInsert(List<Place> temp) {

        jdbcTemplate.batchUpdate("INSERT INTO place(" +
                        "`place_id`," + "`name`, " +
                        "`addr1`," + "`areacode`," +
                        "`firstimage`," + "`firstimage2`," +
                        "`mapx`,`mapy`," +
                        "`sigungucode`,`contentid`,`overview`)" +
                        "VALUES (?,?,?,?,?,?,?,?,?,?,?)",
                new BatchPreparedStatementSetter() {
                    @Override
                    public void setValues(PreparedStatement ps, int i) throws SQLException {

                        ps.setObject(1,temp.get(i).getId(),Types.VARCHAR);
                        ps.setObject(2, temp.get(i).getName(), Types.VARCHAR);
                        ps.setObject(3, temp.get(i).getAddr1(), Types.VARCHAR);
                        ps.setObject(4, temp.get(i).getAreacode(), Types.VARCHAR);
                        ps.setObject(5, temp.get(i).getFirstimage(), Types.VARCHAR);
                        ps.setObject(6, temp.get(i).getFirstimage2(), Types.VARCHAR);
                        ps.setObject(7, temp.get(i).getMapx(), Types.VARCHAR);
                        ps.setObject(8, temp.get(i).getMapy(), Types.VARCHAR);
                        ps.setObject(9, temp.get(i).getSigungucode(), Types.VARCHAR);
                        ps.setObject(10, temp.get(i).getContentid(), Types.VARCHAR);
                        ps.setObject(11, temp.get(i).getOverview(), Types.VARCHAR);

                    }

                    @Override
                    public int getBatchSize() {
                        return temp.size();
                    }
                });
    }
}
