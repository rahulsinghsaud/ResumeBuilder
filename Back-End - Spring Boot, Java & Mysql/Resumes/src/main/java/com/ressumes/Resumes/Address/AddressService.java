package com.ressumes.Resumes.Address;

import com.ressumes.Resumes.Address.Address;
import com.ressumes.Resumes.Address.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AddressService {
    @Autowired
    private AddressRepository AddressRepository;
    public List<Address> getAllAddress(){
        List<Address> address = new ArrayList<>();
        AddressRepository.findAll().forEach(address ::add);
        return address;
    }

    public void addAddress(Address address) {
        AddressRepository.save(address);
    }

    public void updateAddress(Address address) {
        AddressRepository.save(address);
    }

    public void deleteAddress(int addressID) {
        AddressRepository.delete(AddressRepository.getOne(addressID));

    }

    public Optional<Address> getOneAddress(int addressID) {
        Optional<Address> p = AddressRepository.findById(addressID);
        return p ;

    }

    public Optional<Address> addressByID(int addressID) {
        return AddressRepository.findById(addressID);
    }
}
