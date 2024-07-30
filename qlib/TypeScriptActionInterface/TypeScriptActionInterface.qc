# -*- mode: qore; indent-tabs-mode: nil -*-
#! Qore TypeScriptActionInterface module definition

/*  TypeScriptActionInterface.qc Copyright 2024 Qore Technologies, s.r.o.

    Permission is hereby granted, free of charge, to any person obtaining a
    copy of this software and associated documentation files (the "Software"),
    to deal in the Software without restriction, including without limitation
    the rights to use, copy, modify, merge, publish, distribute, sublicense,
    and/or sell copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
    DEALINGS IN THE SOFTWARE.
*/

#! Main namespace for the TypeScriptActionInterface module
namespace TypeScriptActionInterfacePriv {
#! Interface class
class TypeScriptActionInterface {
    static registerApp(hash<auto> app) {
        if (app.logo) {
            app.logo = parse_base64_string(app.logo);
        }
        DataProviderActionCatalog::registerApp(cast<hash<DataProviderAppInfo>>(app));
    }

    static registerAction(hash<auto> action) {
        if (action.convenience_options) {
            action.convenience_options = TypeScriptActionInterface::getOptions(action.convenience_options);
        }
        if (action.advanced_options) {
            action.advanced_options = TypeScriptActionInterface::getOptions(action.advanced_options);
        }
        if (action.output_type) {
            action.output_type = TypeScriptActionInterface::getType(action.output_type);
        }
        DataProviderActionCatalog::registerAction(cast<hash<DataProviderActionInfo>>(action));
    }

    static hash<string, hash<ActionOptionInfo>> getOptions(hash<auto> opts) {
        return map {$1.key: TypeScriptActionInterface::getOptionInfo($1.value)}, opts.pairIterator();
    }

    static hash<ActionOptionInfo> getOptionInfo(hash<auto> opt) {
        opt.type = TypeScriptActionInterface::getType(opt.type);
        return cast<hash<ActionOptionInfo>>(opt);
    }

    static AbstractDataProviderType getType(string name) {
        *AbstractDataProviderType type = AbstractDataProviderTypeMap{name};
        if (!type) {
            throw "TYPE-ERROR", sprintf("Cannot match type %y to a known Qore type", name);
        }
        return type;
    }

    static AbstractDataProviderType getType(hash<auto> h) {
        HashDataType type();
        type.addQoreFields(map {$1.key: TypeScriptActionInterface::getField($1.key, $1.value)}, h.pairIterator());
        return type;
    }

    static AbstractDataProviderType getType(auto v) {
        throw "TYPE-ERROR", sprintf("Expecting \"string\" or \"hash\" for the option \"type\"; got %y "
            "instead", v.fullType());
    }

    static hash<auto> getField(hash<auto> h) {
        h.type = TypeScriptActionInterface::getType(h.type);
        return h;
    }
}
}