"use client"

import { useState } from "react"
import { User, Save, Calculator, Target, Activity, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HealthProfile {
  age: number
  weight: number
  height: number
  activityLevel: string
  dailyProteinTarget: number
  ldlTarget: number
  weightGoal: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<HealthProfile>({
    age: 30,
    weight: 70,
    height: 175,
    activityLevel: "moderate",
    dailyProteinTarget: 50,
    ldlTarget: 100,
    weightGoal: "maintain",
  })

  const [saved, setSaved] = useState(false)

  const calculateBMI = () => {
    const heightInMeters = profile.height / 100
    return (profile.weight / (heightInMeters * heightInMeters)).toFixed(1)
  }

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "Underweight", color: "text-warning" }
    if (bmi < 25) return { label: "Normal", color: "text-success" }
    if (bmi < 30) return { label: "Overweight", color: "text-warning" }
    return { label: "Obese", color: "text-destructive" }
  }

  const bmi = parseFloat(calculateBMI())
  const bmiCategory = getBMICategory(bmi)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Page header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Health Profile</h1>
        <p className="text-muted-foreground mt-1">
          Set your personal health parameters for personalized insights
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Personal Information</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Age</label>
                <input
                  type="number"
                  value={profile.age}
                  onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Weight (kg)</label>
                <input
                  type="number"
                  value={profile.weight}
                  onChange={(e) => setProfile({ ...profile, weight: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Height (cm)</label>
                <input
                  type="number"
                  value={profile.height}
                  onChange={(e) => setProfile({ ...profile, height: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Activity Level</label>
                <select
                  value={profile.activityLevel}
                  onChange={(e) => setProfile({ ...profile, activityLevel: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground"
                >
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Light Activity</option>
                  <option value="moderate">Moderate Activity</option>
                  <option value="active">Very Active</option>
                  <option value="athlete">Athlete</option>
                </select>
              </div>
            </div>
          </div>

          {/* Health Goals */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Health Goals</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Daily Protein Target (g)
                </label>
                <input
                  type="number"
                  value={profile.dailyProteinTarget}
                  onChange={(e) => setProfile({ ...profile, dailyProteinTarget: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  LDL Target (mg/dL)
                </label>
                <input
                  type="number"
                  value={profile.ldlTarget}
                  onChange={(e) => setProfile({ ...profile, ldlTarget: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Weight Goal</label>
                <div className="grid grid-cols-3 gap-3">
                  {["lose", "maintain", "gain"].map((goal) => (
                    <button
                      key={goal}
                      onClick={() => setProfile({ ...profile, weightGoal: goal })}
                      className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                        profile.weightGoal === goal
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-secondary text-foreground border-border hover:border-primary/50"
                      }`}
                    >
                      {goal.charAt(0).toUpperCase() + goal.slice(1)} Weight
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 shadow-lg shadow-primary/25"
          >
            <Save className="h-5 w-5 mr-2" />
            {saved ? "Profile Saved!" : "Save Profile"}
          </Button>
        </div>

        {/* BMI Card */}
        <div className="space-y-6">
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calculator className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Your BMI</h2>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-foreground mb-2">{bmi}</div>
              <div className={`text-lg font-medium ${bmiCategory.color}`}>{bmiCategory.label}</div>
              <div className="mt-6 space-y-3">
                <div className="h-2 bg-gradient-to-r from-warning via-success to-destructive rounded-full" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>18.5</span>
                  <span>25</span>
                  <span>30</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Daily Needs</h2>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50">
                <span className="text-sm text-muted-foreground">Est. Calories</span>
                <span className="font-medium text-foreground">
                  {Math.round(10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50">
                <span className="text-sm text-muted-foreground">Protein Target</span>
                <span className="font-medium text-foreground">{profile.dailyProteinTarget}g</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50">
                <span className="text-sm text-muted-foreground">Water Intake</span>
                <span className="font-medium text-foreground">{(profile.weight * 0.033).toFixed(1)}L</span>
              </div>
            </div>
          </div>

          {/* Health Tips */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Health Tip</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Based on your profile, aim for 7-8 hours of sleep and include at least 30 minutes of physical activity daily for optimal health.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
