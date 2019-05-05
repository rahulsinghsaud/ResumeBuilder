package com.ressumes.Resumes.Refer;

import com.ressumes.Resumes.Refer.Refer;
import com.ressumes.Resumes.Refer.ReferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReferService {
    @Autowired
    private ReferRepository referRepository;
    public List<Refer> getAllRefer(){
        List<Refer> refers = new ArrayList<>();
        referRepository.findAll().forEach(refers ::add);
        return refers;
    }

    public void addRefer(Refer refer) {
        referRepository.save(refer);
    }

    public void updateRefer(Refer refer) {
        referRepository.save(refer);
    }

    public void deleteRefer(int referID) {
        referRepository.delete(referRepository.getOne(referID));

    }

    public Optional<Refer> getOneRefer(int ReferID) {
        Optional<Refer> p = referRepository.findById(ReferID);
        return p ;

    }

    public Optional<Refer> ReferById(int referID) {
        return referRepository.findById(referID);
    }
}
