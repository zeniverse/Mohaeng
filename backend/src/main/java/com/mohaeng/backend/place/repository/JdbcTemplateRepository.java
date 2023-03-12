package com.mohaeng.backend.place.repository;

import com.mohaeng.backend.place.domain.Place;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class JdbcTemplateRepository {

    private final JdbcTemplate jdbcTemplate;

    public void batchInsert(List<Place> temp) {

        jdbcTemplate.batchUpdate("INSERT INTO Place(" +
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
