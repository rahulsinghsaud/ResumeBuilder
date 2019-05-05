package com.ressumes.Resumes.Address;


import com.ressumes.Resumes.Address.Address;
import com.ressumes.Resumes.Address.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/addressapi")
public class AddressController {

    @Autowired
    AddressService addressService;

    @GetMapping(path="/address")
    public @ResponseBody Iterable<Address> getAllAddresss() {
        // This returns a JSON or XML with the users
        return addressService.getAllAddress();
    }

    @RequestMapping(method=RequestMethod.POST, value="/address")
    public @ResponseBody String updateAddress(@RequestBody Address address) {
        addressService.updateAddress(address);
        return "Record Created";
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/address/{id}")
    @ResponseBody
    public String deleteAddress(@PathVariable int id){
        addressService.deleteAddress(id);
        return "Record Deleted";
    }

    @RequestMapping(method=RequestMethod.PUT, value="/address")
    @ResponseBody
    public String postAddress(@RequestBody Address address) {
        addressService.updateAddress(address);
        return "Record Updated";
    }
    @RequestMapping(method=RequestMethod.GET, value="/address/{id}")
    public @ResponseBody Optional<Address> getAddressById(@PathVariable(value = "id") Integer addressID) {
        return addressService.addressByID(addressID);
    }
}
