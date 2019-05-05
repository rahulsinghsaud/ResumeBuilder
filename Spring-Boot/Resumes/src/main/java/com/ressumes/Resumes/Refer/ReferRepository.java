package com.ressumes.Resumes.Refer;

import com.ressumes.Resumes.Refer.Refer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReferRepository extends JpaRepository<Refer, Integer> {


}