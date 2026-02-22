import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Separator } from "../components/ui/separator";
import {
  User, Shield, Palette, Database,
  Save, Download, Trash2, LogOut, Loader2,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { settingsApi, type ProfileData, type PreferencesData } from "../lib/api";
import { toast } from "sonner";

export function SettingsPage() {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const [profile, setProfile] = useState<ProfileData>({ name: "", email: "" });
  const [prefs, setPrefs] = useState<PreferencesData>({
    ai_processing: true,
    usage_analytics: false,
    dark_mode: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    Promise.all([settingsApi.getProfile(), settingsApi.getPreferences()])
      .then(([p, pr]) => {
        setProfile(p);
        setPrefs(pr);
      })
      .catch(() => toast.error("Failed to load settings."))
      .finally(() => setLoading(false));
  }, []);

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const updated = await settingsApi.updateProfile(profile);
      setProfile(updated);
      toast.success("Profile updated.");
    } catch (err: any) {
      toast.error(err.message || "Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (key: keyof PreferencesData, value: boolean) => {
    const updated = { ...prefs, [key]: value };
    setPrefs(updated);
    try {
      await settingsApi.updatePreferences({ [key]: value });
    } catch {
      setPrefs(prefs); // revert
      toast.error("Failed to update preference.");
    }
  };

  const handleExport = async () => {
    try {
      const data = await settingsApi.exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "journal_data_export.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Data exported successfully.");
    } catch {
      toast.error("Failed to export data.");
    }
  };

  const handleDeleteAll = async () => {
    if (!confirm("Are you sure? This will permanently delete all your journal entries, analyses, and insights. This cannot be undone.")) {
      return;
    }
    setDeleting(true);
    try {
      await settingsApi.deleteData();
      toast.success("All journal data deleted.");
    } catch {
      toast.error("Failed to delete data.");
    } finally {
      setDeleting(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch {
      toast.error("Failed to sign out.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="size-8 animate-spin text-[#8AA2C8]" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="size-5 text-[#8AA2C8]" />
            <h2 className="text-lg font-medium">Profile</h2>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={profile.name || ""}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profile.email || ""}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </div>
          <Button onClick={handleSaveProfile} disabled={saving} className="bg-[#8AA2C8] hover:bg-[#B6CAEB] text-black gap-2">
            {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Privacy */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="size-5 text-[#9AAB63]" />
            <h2 className="text-lg font-medium">Privacy & AI</h2>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">AI Processing</p>
              <p className="text-xs text-muted-foreground">Allow AI to analyze your entries</p>
            </div>
            <Switch
              checked={prefs.ai_processing}
              onCheckedChange={(v) => handleToggle("ai_processing", v)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Usage Analytics</p>
              <p className="text-xs text-muted-foreground">Help improve the app with anonymous usage data</p>
            </div>
            <Switch
              checked={prefs.usage_analytics}
              onCheckedChange={(v) => handleToggle("usage_analytics", v)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="size-5 text-[#E09CC3]" />
            <h2 className="text-lg font-medium">Appearance</h2>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Dark Mode</p>
              <p className="text-xs text-muted-foreground">Use dark theme throughout the app</p>
            </div>
            <Switch
              checked={prefs.dark_mode}
              onCheckedChange={(v) => handleToggle("dark_mode", v)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Database className="size-5 text-[#B6CAEB]" />
            <h2 className="text-lg font-medium">Data Management</h2>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start gap-2" onClick={handleExport}>
            <Download className="size-4" />
            Export All Journal Entries
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start gap-2 text-destructive hover:text-destructive"
            onClick={handleDeleteAll}
            disabled={deleting}
          >
            {deleting ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
            Delete All Data
          </Button>
        </CardContent>
      </Card>

      {/* Account */}
      <Card>
        <CardContent className="p-4">
          <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground" onClick={handleSignOut}>
            <LogOut className="size-4" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
