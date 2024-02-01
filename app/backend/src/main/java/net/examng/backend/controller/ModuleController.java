package net.examng.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import net.examng.backend.model.Module;
import net.examng.backend.service.ModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/modules")
public class ModuleController {

    @Autowired
    private ModuleService moduleService;

    @GetMapping("")

    @Operation(summary = "Get all modules with pagination")
    public Page<Module> getModules(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int pageSize) {
        return moduleService.getAllModules(PageRequest.of(page - 1, pageSize));
    }
    @GetMapping("/{moduleCode}")
    @Operation(summary = "Get a module by its code")
    public Module getModule(@PathVariable String moduleCode) {
        return moduleService.getModule(moduleCode);
    }

    @PostMapping("/")
    @Operation(summary = "Add a new module")
    public Module addModule(@RequestBody Module module) {
        return moduleService.addModule(module);
    }

    @PutMapping("/{moduleCode}")
    @Operation(summary = "Update a module")
    public Module updateModule(@PathVariable String moduleCode, @RequestBody Module updatedModule) {
        return moduleService.updateModule(moduleCode, updatedModule);
    }

    @DeleteMapping("/{moduleCode}")
    @Operation(summary = "Delete a module")
    public void deleteModule(@PathVariable String moduleCode) {
        moduleService.deleteModule(moduleCode);
    }

}
